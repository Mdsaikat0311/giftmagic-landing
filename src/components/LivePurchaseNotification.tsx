import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { LIVE_PURCHASE_NOTIFICATIONS } from '../data/productData';
import { CustomerOrder } from '../types';

interface NotificationItem {
  name: string;
  city: string;
  item: string;
  time: string;
  isReal?: boolean;
}

export const LivePurchaseNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(LIVE_PURCHASE_NOTIFICATIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Load real e-commerce orders from localStorage and WooCommerce bridge
  useEffect(() => {
    const loadOrders = async () => {
      const realItems: NotificationItem[] = [];

      // 1. Read locally stored e-commerce orders
      try {
        const stored = localStorage.getItem('giftmagic_orders') || localStorage.getItem('jhilmill_orders');
        if (stored) {
          const parsedOrders: CustomerOrder[] = JSON.parse(stored);
          parsedOrders.slice(0, 10).forEach((ord) => {
            if (ord.customerName) {
              realItems.push({
                name: ord.customerName,
                city: ord.deliveryArea === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে',
                item: ord.packageName || '১ জোড়া স্নেক পায়েল',
                time: 'সদ্য অর্ডার হয়েছে',
                isReal: true,
              });
            }
          });
        }
      } catch (e) {
        console.error('Error reading local orders', e);
      }

      // 2. Fetch live WooCommerce orders from order-bridge.php if available
      try {
        const res = await fetch('./order-bridge.php', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.orders && Array.isArray(data.orders)) {
            data.orders.forEach((o: any) => {
              if (o.name) {
                realItems.push({
                  name: o.name,
                  city: o.city || 'বাংলাদেশ',
                  item: o.item || '১৮ ক্যারেট গোল্ড প্লেটেড পায়েল',
                  time: o.time || 'কিছুক্ষণ আগে',
                  isReal: true,
                });
              }
            });
          }
        }
      } catch {
        // Fallback silently
      }

      // Merge real orders with demo orders so it repeatedly loops smoothly
      if (realItems.length > 0) {
        setNotifications([...realItems, ...LIVE_PURCHASE_NOTIFICATIONS]);
      }
    };

    loadOrders();
  }, []);

  // Interval loop: repeatedly show orders with a 10-second pause in between
  useEffect(() => {
    if (dismissed || notifications.length === 0) return;

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleCycle = () => {
      // 10-second pause (১০ সেকেন্ডের বিরতি) before showing next order
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);

        // Keep visible for 5 seconds
        timerId = setTimeout(() => {
          if (!isMounted) return;
          setVisible(false);
          scheduleCycle();
        }, 5000);
      }, 10000);
    };

    // Initial appearance after 2.5 seconds
    timerId = setTimeout(() => {
      if (!isMounted) return;
      setVisible(true);

      // Keep visible for 5 seconds, then enter 10-second pause cycle
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setVisible(false);
        scheduleCycle();
      }, 5000);
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [dismissed, notifications.length]);

  if (dismissed || !visible || notifications.length === 0) return null;

  const current = notifications[currentIndex % notifications.length];

  return (
    /* Small, compact side corner badge: NEVER takes full screen */
    <aside
      aria-live="polite"
      className="fixed bottom-18 sm:bottom-6 left-3 sm:left-5 z-40 w-[240px] sm:w-[265px] max-w-[80vw] bg-white/95 backdrop-blur-md border border-[#d8be8d] rounded-xl p-2.5 shadow-lg font-bengali transition-all duration-300 right-auto animate-fadeIn select-none"
    >
      <div className="flex items-center gap-2.5">
        {/* Tiny thumbnail */}
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#e0d3be] shrink-0 bg-[#faf6ee]">
          <img
            src="./assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg"
            alt="Payel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Order text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] text-[#2d7a46] font-semibold leading-tight">
            <CheckCircle className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">
              {current.isReal ? 'ই-কমার্স অর্ডার' : 'সদ্য অর্ডার হয়েছে'}
            </span>
          </div>
          <p className="text-[11px] font-bold text-[#211c19] truncate leading-tight mt-0.5">
            {current.name} · <span className="text-stone-500 font-normal">{current.city}</span>
          </p>
          <p className="text-[10px] text-[#9e2a2b] font-medium truncate leading-tight">
            {current.item}
          </p>
        </div>

        {/* Small dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close notification"
          className="text-stone-300 hover:text-stone-600 p-0.5 cursor-pointer shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
