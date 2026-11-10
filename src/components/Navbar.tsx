import React from 'react';
import { ShoppingBag, PhoneCall, Sparkles, Truck, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenTracking: () => void;
  cartCount: number;
  onScrollToOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenTracking,
  cartCount,
  onScrollToOrder,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fdfcf9]/95 backdrop-blur-md border-b border-[#e9e2d5] shadow-xs">
      {/* Top Promotional Announcement Bar */}
      <div className="bg-[#1e1b18] text-[#f7e7ce] text-xs py-2 px-4 border-b border-[#3d3429]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-bengali font-medium">
              সারা বাংলাদেশে ক্যাশ অন ডেলিভারি · ডেলিভারি ম্যানের সামনে দেখে পেমেন্ট করার সুবিধা
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#e3d5be]">
            <span className="flex items-center gap-1 font-bengali">
              <CheckCircle2 className="w-3 h-3 text-[#d4af37]" /> ১০০% কালার গ্যারান্টি
            </span>
            <span className="flex items-center gap-1 font-bengali">
              <Truck className="w-3 h-3 text-[#d4af37]" /> ২-৩ দিনে দ্রুত হোম ডেলিভারি
            </span>
            <a
              href="tel:01700000000"
              className="flex items-center gap-1 font-bengali text-[#f5d77f] hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3" /> হেল্পলাইন: 01700-000000
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar: Exactly 3 Zones (Top Bar Contract) */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-8 px-3 sm:px-6 py-2.5 sm:py-3.5 w-full">
        {/* Zone 1: Single Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-[#c99f36] to-[#916e1e] flex items-center justify-center text-white shadow-xs">
            <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wider">J</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-lg sm:text-2xl font-bold tracking-widest text-[#211c19] uppercase">
              JHILMILL
            </span>
            <span className="font-bengali text-[9px] sm:text-[10px] tracking-wider text-[#94784a] -mt-1 font-medium">
              ঝিলমিল · লাক্সারি গিফট
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean Single-Line Text Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bengali font-medium text-[#5c5044]">
          <a
            href="#details"
            className="hover:text-[#9e2a2b] transition-colors whitespace-nowrap shrink-0"
          >
            পণ্য বিবরণী
          </a>
          <a
            href="#packaging"
            className="hover:text-[#9e2a2b] transition-colors whitespace-nowrap shrink-0"
          >
            উপহার প্যাকেজিং
          </a>
          <a
            href="#reviews"
            className="hover:text-[#9e2a2b] transition-colors whitespace-nowrap shrink-0"
          >
            গ্রাহক রিভিউ
          </a>
          <a
            href="#faq"
            className="hover:text-[#9e2a2b] transition-colors whitespace-nowrap shrink-0"
          >
            প্রশ্নোত্তর
          </a>
          <button
            onClick={onOpenTracking}
            className="text-[#916e1e] hover:text-[#211c19] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            অর্ডার ট্র্যাক
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Shopping Bag trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative p-1.5 sm:p-2 text-[#4a3f35] hover:text-[#9e2a2b] transition-colors rounded-md hover:bg-[#f3ede3] cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#9e2a2b] text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onScrollToOrder}
            className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bengali font-semibold text-white bg-linear-to-r from-[#a37920] via-[#c99f36] to-[#a37920] hover:brightness-105 active:scale-95 transition-all shadow-sm rounded-md whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">এখনই</span> অর্ডার করুন
          </button>
        </div>
      </div>
    </header>
  );
};
