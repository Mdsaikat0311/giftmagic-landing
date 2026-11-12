import { CustomerOrder } from '../types';

export interface WcSyncResult {
  success: boolean;
  source?: 'woocommerce_native' | 'woocommerce_rest_api' | 'file_backup' | 'local_only';
  wcOrderId?: string | number;
  message?: string;
}

const STORAGE_KEY_WC_URL = 'giftmagic_wc_url';
const STORAGE_KEY_WC_CK = 'giftmagic_wc_ck';
const STORAGE_KEY_WC_CS = 'giftmagic_wc_cs';

export const getStoredWcSettings = () => {
  try {
    return {
      wcUrl: localStorage.getItem(STORAGE_KEY_WC_URL) || '',
      wcCk: localStorage.getItem(STORAGE_KEY_WC_CK) || '',
      wcCs: localStorage.getItem(STORAGE_KEY_WC_CS) || '',
    };
  } catch {
    return { wcUrl: '', wcCk: '', wcCs: '' };
  }
};

export const saveStoredWcSettings = (settings: { wcUrl: string; wcCk: string; wcCs: string }) => {
  try {
    if (settings.wcUrl) localStorage.setItem(STORAGE_KEY_WC_URL, settings.wcUrl.trim());
    else localStorage.removeItem(STORAGE_KEY_WC_URL);

    if (settings.wcCk) localStorage.setItem(STORAGE_KEY_WC_CK, settings.wcCk.trim());
    else localStorage.removeItem(STORAGE_KEY_WC_CK);

    if (settings.wcCs) localStorage.setItem(STORAGE_KEY_WC_CS, settings.wcCs.trim());
    else localStorage.removeItem(STORAGE_KEY_WC_CS);
  } catch (e) {
    console.error('Failed to save WooCommerce settings', e);
  }
};

/**
 * Submit order to WooCommerce:
 * 1. Automatically attempts the native PHP bridge (order-bridge.php) when hosted on WordPress
 * 2. Falls back to WooCommerce REST API if external credentials configured
 * 3. Gracefully returns local success if previewing or offline
 */
export const submitOrderToWooCommerce = async (
  order: CustomerOrder
): Promise<WcSyncResult> => {
  // Method 1: Try the auto-included order-bridge.php (Standard WordPress Host Deployment)
  const candidateBridgeUrls = [
    './order-bridge.php',
    'order-bridge.php',
    '/order-bridge.php',
  ];

  for (const url of candidateBridgeUrls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success) {
          return {
            success: true,
            source: data.source || 'woocommerce_native',
            wcOrderId: data.order_id || data.wc_order_id,
            message: data.message || 'WooCommerce order created successfully!',
          };
        }
      }
    } catch {
      // Continue to next attempt
    }
  }

  // Method 2: Try WooCommerce REST API if merchant configured Keys
  const { wcUrl, wcCk, wcCs } = getStoredWcSettings();
  if (wcUrl && wcCk && wcCs) {
    try {
      const cleanUrl = wcUrl.replace(/\/+$/, '');
      const apiUrl = `${cleanUrl}/wp-json/wc/v3/orders`;
      const authHeader = 'Basic ' + btoa(`${wcCk}:${wcCs}`);

      const bodyData = {
        payment_method: 'cod',
        payment_method_title: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
        set_paid: false,
        status: 'processing',
        billing: {
          first_name: order.customerName,
          address_1: order.address,
          city: order.deliveryArea === 'inside_dhaka' ? 'Dhaka' : 'Outside Dhaka',
          country: 'BD',
          phone: order.phone,
        },
        shipping: {
          first_name: order.customerName,
          address_1: order.address,
          city: order.deliveryArea === 'inside_dhaka' ? 'Dhaka' : 'Outside Dhaka',
          country: 'BD',
          phone: order.phone,
        },
        line_items: [
          {
            name: `${order.packageName} (${order.quantity} জোড়া)`,
            price: String(order.unitPrice),
            quantity: order.quantity,
            total: String(order.unitPrice * order.quantity),
          },
        ],
        fee_lines: [
          ...(order.includeKidsPayel && order.kidsPayelPrice
            ? [
                {
                  name: 'বাচ্চা মেয়েদের ১ জোড়া পায়েল (অ্যাড-অন)',
                  total: String(order.kidsPayelPrice),
                },
              ]
            : []),
          {
            name:
              order.deliveryArea === 'inside_dhaka'
                ? 'ডেলিভারি চার্জ (ঢাকার ভেতরে)'
                : 'ডেলিভারি চার্জ (ঢাকার বাইরে)',
            total: String(order.deliveryFee),
          },
        ],
      };

      const restRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(bodyData),
      });

      if (restRes.ok) {
        const restData = await restRes.json();
        return {
          success: true,
          source: 'woocommerce_rest_api',
          wcOrderId: restData.id,
          message: `WooCommerce Order #${restData.id} created successfully via REST API!`,
        };
      }
    } catch (e) {
      console.warn('WooCommerce REST API attempt failed', e);
    }
  }

  // Fallback: Local order recorded safely
  return {
    success: true,
    source: 'local_only',
    message: 'Order saved locally. Upload to WordPress for instant WooCommerce sync.',
  };
};
