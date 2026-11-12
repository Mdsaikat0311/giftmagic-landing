<?php
/**
 * Gift Magic - WooCommerce Native Order Bridge
 * Automatically creates WooCommerce orders when uploaded to WordPress
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(array('status' => 'ok'));
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array(
        'success' => false,
        'message' => 'Method not allowed. Please send POST request with order data.'
    ));
    exit;
}

// Retrieve JSON body
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data || empty($data['customerName']) || empty($data['phone'])) {
    http_response_code(400);
    echo json_encode(array(
        'success' => false,
        'message' => 'Customer name and phone number are required.'
    ));
    exit;
}

// Step 1: Search and locate wp-load.php by traversing upwards
$wp_loaded = false;
$current_dir = __DIR__;

for ($i = 0; $i < 8; $i++) {
    if (file_exists($current_dir . '/wp-load.php')) {
        require_once($current_dir . '/wp-load.php');
        $wp_loaded = true;
        break;
    }
    $parent = dirname($current_dir);
    if ($parent === $current_dir) {
        break;
    }
    $current_dir = $parent;
}

// If WordPress and WooCommerce are loaded
if ($wp_loaded && function_exists('wc_create_order')) {
    try {
        $address = array(
            'first_name' => sanitize_text_field($data['customerName']),
            'phone'      => sanitize_text_field($data['phone']),
            'address_1'  => sanitize_text_field($data['address'] ?? ''),
            'city'       => (!empty($data['deliveryArea']) && $data['deliveryArea'] === 'inside_dhaka') ? 'Dhaka' : 'Outside Dhaka',
            'state'      => (!empty($data['deliveryArea']) && $data['deliveryArea'] === 'inside_dhaka') ? 'Dhaka' : '',
            'country'    => 'BD',
        );

        $order = wc_create_order();

        // 1. Add main product item
        $packageName = !empty($data['packageName']) ? $data['packageName'] : '১৮ ক্যারেট গোল্ড প্লেটেড লাক্সারি পায়েল';
        $quantity = !empty($data['quantity']) ? intval($data['quantity']) : 1;
        $unitPrice = !empty($data['unitPrice']) ? floatval($data['unitPrice']) : 690;
        $itemTotal = $unitPrice * $quantity;

        $productItem = new WC_Order_Item_Fee();
        $productItem->set_name($packageName . ' (পরিমাণ: ' . $quantity . ' জোড়া)');
        $productItem->set_amount($itemTotal);
        $productItem->set_total($itemTotal);
        $order->add_item($productItem);

        // 2. Add optional kids payel add-on if selected
        if (!empty($data['includeKidsPayel']) && !empty($data['kidsPayelPrice'])) {
            $kidsFee = new WC_Order_Item_Fee();
            $kidsFee->set_name('বাচ্চা মেয়েদের ১ জোড়া পায়েল (কিডস অ্যাড-অন)');
            $kidsFee->set_amount(floatval($data['kidsPayelPrice']));
            $kidsFee->set_total(floatval($data['kidsPayelPrice']));
            $order->add_item($kidsFee);
        }

        // 3. Add delivery charge fee
        if (!empty($data['deliveryFee'])) {
            $deliveryFeeItem = new WC_Order_Item_Fee();
            $deliveryTitle = (!empty($data['deliveryArea']) && $data['deliveryArea'] === 'inside_dhaka')
                ? 'হোম ডেলিভারি চার্জ (ঢাকার ভেতরে)'
                : 'হোম ডেলিভারি চার্জ (ঢাকার বাইরে)';
            $deliveryFeeItem->set_name($deliveryTitle);
            $deliveryFeeItem->set_amount(floatval($data['deliveryFee']));
            $deliveryFeeItem->set_total(floatval($data['deliveryFee']));
            $order->add_item($deliveryFeeItem);
        }

        // 4. Assign Billing and Shipping address
        $order->set_address($address, 'billing');
        $order->set_address($address, 'shipping');

        // 5. Set Payment Method to Cash on Delivery (COD)
        $order->set_payment_method('cod');
        $order->set_payment_method_title('ক্যাশ অন ডেলিভারি (Cash on Delivery)');
        $order->set_status('processing', 'Landing Page Order via Gift Magic');

        // Calculate and save order
        $order->calculate_totals();
        $order_id = $order->save();

        // Add detailed order note inside WooCommerce admin
        $note = sprintf(
            "ল্যান্ডিং পেজ অর্ডার (#%s):\nগ্রাহক: %s\nমোবাইল: %s\nঠিকানা: %s\nপ্যাকেজ: %s (পরিমাণ: %d)\nসর্বমোট: ৳%s (ক্যাশ অন ডেলিভারি)",
            $data['id'] ?? $order_id,
            $data['customerName'],
            $data['phone'],
            $data['address'] ?? 'N/A',
            $packageName,
            $quantity,
            $data['total'] ?? $order->get_total()
        );
        $order->add_order_note($note);

        http_response_code(200);
        echo json_encode(array(
            'success'   => true,
            'source'    => 'woocommerce_native',
            'order_id'  => $order_id,
            'wc_order_id' => $order_id,
            'message'   => 'WooCommerce order #' . $order_id . ' created successfully!'
        ));
        exit;
    } catch (Exception $e) {
        // Log error and fallback to file storage
        error_log('WooCommerce Order Error: ' . $e->getMessage());
    }
}

// Fallback: If WordPress is not detected or an error occurred, save order into local orders.json file
$orders_file = __DIR__ . '/orders.json';
$existing_orders = array();

if (file_exists($orders_file)) {
    $content = file_get_contents($orders_file);
    if (!empty($content)) {
        $existing_orders = json_decode($content, true) ?: array();
    }
}

$data['saved_at'] = date('Y-m-d H:i:s');
$data['ip'] = $_SERVER['REMOTE_ADDR'] ?? '';
array_unshift($existing_orders, $data);

// Keep last 500 orders
if (count($existing_orders) > 500) {
    $existing_orders = array_slice($existing_orders, 0, 500);
}

@file_put_contents($orders_file, json_encode($existing_orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

http_response_code(200);
echo json_encode(array(
    'success'       => true,
    'source'        => 'file_backup',
    'order_id'      => $data['id'] ?? ('JS-' . rand(100000, 999999)),
    'message'       => 'Order recorded successfully (Backup mode). Upload to WordPress root/wp-content to sync directly to WooCommerce.'
));
