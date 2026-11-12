import { CustomerOrder } from '../types';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    gtag?: any;
    dataLayer?: any[];
    ttq?: any;
  }
}

const STORAGE_KEY_PIXEL = 'giftmagic_fb_pixel_id';

/**
 * Get configured Facebook Pixel ID from localStorage or environment
 */
export const getStoredPixelId = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEY_PIXEL) || '';
  } catch {
    return '';
  }
};

/**
 * Save Facebook Pixel ID to localStorage
 */
export const setStoredPixelId = (pixelId: string): void => {
  try {
    if (pixelId) {
      localStorage.setItem(STORAGE_KEY_PIXEL, pixelId.trim());
      initPixel(pixelId.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_PIXEL);
    }
  } catch (e) {
    console.error('Failed to save pixel ID', e);
  }
};

/**
 * Dynamically initialize Meta (Facebook) Pixel if not already on the page
 */
export const initPixel = (pixelId?: string): void => {
  const id = pixelId || getStoredPixelId();
  if (!id && !window.fbq) return;

  if (!window.fbq) {
    // Official Facebook Pixel standard loader
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
  }

  if (window.fbq && id) {
    window.fbq('init', id);
  }
};

/**
 * Track PageView for all loaded tracking platforms
 */
export const trackPageView = (): void => {
  // 1. Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }

  // 2. Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view');
  }

  // 3. TikTok Pixel
  if (window.ttq && typeof window.ttq.page === 'function') {
    window.ttq.page();
  }

  // 4. Google Tag Manager DataLayer
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: 'page_view' });
  }
};

/**
 * Track Initiate Checkout event
 */
export const trackInitiateCheckout = (
  packageName: string,
  total: number,
  quantity: number
): void => {
  // 1. Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: packageName,
      content_type: 'product',
      value: total,
      currency: 'BDT',
      num_items: quantity,
    });
  }

  // 2. Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'BDT',
      value: total,
    });
  }

  // 3. TikTok Pixel
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track('InitiateCheckout', {
      content_name: packageName,
      value: total,
      currency: 'BDT',
    });
  }

  // 4. DataLayer
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'initiate_checkout',
      ecommerce: {
        currency: 'BDT',
        value: total,
      },
    });
  }
};

/**
 * Track Purchase & Lead when order is successfully placed
 */
export const trackPurchase = (order: CustomerOrder): void => {
  const payload = {
    content_name: order.packageName,
    content_type: 'product',
    content_ids: [order.packageId],
    value: order.total,
    currency: 'BDT',
    num_items: order.quantity,
    order_id: order.id,
  };

  // 1. Meta Pixel: Purchase + Lead
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', payload);
    window.fbq('track', 'Lead', {
      content_name: order.packageName,
      value: order.total,
      currency: 'BDT',
    });
  }

  // 2. Google Analytics / GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: 'BDT',
      items: [
        {
          item_id: order.packageId,
          item_name: order.packageName,
          price: order.unitPrice,
          quantity: order.quantity,
        },
      ],
    });
  }

  // 3. TikTok Pixel
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track('CompletePayment', {
      content_id: order.packageId,
      content_name: order.packageName,
      value: order.total,
      currency: 'BDT',
      quantity: order.quantity,
    });
  }

  // 4. Google Tag Manager DataLayer
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: order.id,
        value: order.total,
        currency: 'BDT',
        items: [
          {
            item_id: order.packageId,
            item_name: order.packageName,
            price: order.unitPrice,
            quantity: order.quantity,
          },
        ],
      },
    });
  }
};
