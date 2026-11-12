import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { ProductPackage } from '../types';

interface MobileStickyBarProps {
  selectedPackage: ProductPackage;
  onScrollToOrder: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  selectedPackage,
  onScrollToOrder,
}) => {
  const whatsappUrl = `https://wa.me/8801823417090?text=${encodeURIComponent(
    `আসসালামু আলাইকুম! আমি Gift Magic থেকে "${selectedPackage.bengaliName}" অর্ডার করতে চাই।`
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#fdfcf9]/95 backdrop-blur-md border-t border-[#e5d8c3] px-4 py-2.5 shadow-lg">
      <div className="flex items-center justify-between gap-3 font-bengali">
        {/* Price Info */}
        <div className="flex flex-col">
          <span className="text-[10px] text-[#786654] leading-none">বিশেষ অফার মূল্য:</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-serif-luxury font-bold text-xl text-[#9e2a2b] tabular-nums">
              ৳{selectedPackage.salePrice}
            </span>
            <span className="text-xs text-stone-400 line-through tabular-nums">
              ৳{selectedPackage.regularPrice}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Order"
            className="p-2.5 rounded-xl bg-[#25d366] text-white hover:bg-[#20bd5a] transition-colors shadow-xs"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            onClick={onScrollToOrder}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-linear-to-r from-[#a37920] via-[#c99f36] to-[#a37920] active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            এখনই অর্ডার করুন
          </button>
        </div>
      </div>
    </div>
  );
};
