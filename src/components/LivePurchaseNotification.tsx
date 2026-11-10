import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle } from 'lucide-react';
import { LIVE_PURCHASE_NOTIFICATIONS } from '../data/productData';

export const LivePurchaseNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial after 3 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Interval to cycle through
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_PURCHASE_NOTIFICATIONS.length);
        setVisible(true);
      }, 4000);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const current = LIVE_PURCHASE_NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-20 left-3 right-3 sm:right-auto sm:left-4 z-40 sm:max-w-xs bg-white/95 backdrop-blur-md border border-[#d8be8d] rounded-2xl p-3 shadow-lg font-bengali transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#e0d3be] shrink-0">
          <img
            src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg"
            alt="Payel ordered"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[11px] text-[#2d7a46] font-semibold">
            <CheckCircle className="w-3 h-3 shrink-0" />
            <span>সদ্য অর্ডার কনফার্ম করেছেন</span>
          </div>
          <p className="text-xs font-bold text-[#211c19] truncate">
            {current.name} · <span className="text-stone-500 font-normal">{current.city}</span>
          </p>
          <p className="text-[10px] text-[#9e2a2b] font-medium truncate">
            {current.item} ({current.time})
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-stone-300 hover:text-stone-600 p-1 cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
