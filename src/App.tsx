import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { UrgencyRibbon } from './components/UrgencyRibbon';
import { ProductHero } from './components/ProductHero';
import { CraftsmanshipFeatures } from './components/CraftsmanshipFeatures';
import { GiftExperienceSection } from './components/GiftExperienceSection';
import { PhotoLookbook } from './components/PhotoLookbook';
import { OrderFormSection } from './components/OrderFormSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LivePurchaseNotification } from './components/LivePurchaseNotification';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminOrdersDrawer } from './components/AdminOrdersDrawer';
import { PRODUCT_PACKAGES } from './data/productData';
import { ProductPackage, CustomerOrder } from './types';

export default function App() {
  // Package selection defaults to 1 Pair (৬৯০ টাকা)
  const [selectedPackage, setSelectedPackage] = useState<ProductPackage>(PRODUCT_PACKAGES[0]);
  const [quantity, setQuantity] = useState<number>(1);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [recentOrder, setRecentOrder] = useState<CustomerOrder | null>(null);

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOrderSuccess = (order: CustomerOrder) => {
    setRecentOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-[#211c19] selection:bg-[#ecd7a7] selection:text-[#211c19] w-full max-w-full overflow-x-hidden">
      {/* 1. Header with Top Announcement Bar */}
      <Navbar
        cartCount={quantity}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onScrollToOrder={scrollToOrderForm}
      />

      {/* 2. Urgency & Trust Ribbon (Stock alert + Countdown) */}
      <UrgencyRibbon />

      <main>
        {/* 3. Hero Product Showcase & Contiguous Buy Module */}
        <ProductHero
          selectedPackage={selectedPackage}
          quantity={quantity}
          onScrollToCheckout={scrollToOrderForm}
        />

        {/* 4. Craftsmanship & 18K Gold Features */}
        <CraftsmanshipFeatures />

        {/* 5. Gifting Experience & Packaging Presentation */}
        <GiftExperienceSection
          onScrollToOrder={scrollToOrderForm}
        />

        {/* 6. Real Customer & Studio Lookbook (All 7 Angles) */}
        <PhotoLookbook />

        {/* 7. Direct Cash on Delivery Checkout Form (Package + Quantity + Details) */}
        <OrderFormSection
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onOrderSuccess={handleOrderSuccess}
        />

        {/* 8. Verified Customer Reviews & Review Submission */}
        <ReviewsSection />

        {/* 9. Frequently Asked Questions (FAQ) */}
        <FAQSection />
      </main>

      {/* 10. Luxury Footer */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToOrder={scrollToOrderForm}
      />

      {/* 11. Subtle Live Order Notification Toast */}
      <LivePurchaseNotification />

      {/* 12. Floating Mobile Sticky Bar */}
      <MobileStickyBar
        selectedPackage={selectedPackage}
        onScrollToOrder={scrollToOrderForm}
      />

      {/* 13. Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedPackage={selectedPackage}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onProceedToCheckout={scrollToOrderForm}
      />

      {/* 14. Order Success Receipt Modal */}
      {recentOrder && (
        <OrderSuccessModal
          order={recentOrder}
          onClose={() => setRecentOrder(null)}
        />
      )}

      {/* 15. Order Tracking Modal */}
      {isTrackingOpen && (
        <OrderTrackerModal
          onClose={() => setIsTrackingOpen(false)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      )}

      {/* 16. Store Manager Admin Drawer */}
      {isAdminOpen && (
        <AdminOrdersDrawer onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
