import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  Check,
  Gift,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import { ProductPackage } from '../types';

interface ProductHeroProps {
  selectedPackage: ProductPackage;
  quantity: number;
  onScrollToCheckout: () => void;
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  selectedPackage,
  quantity,
  onScrollToCheckout,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImg = PRODUCT_IMAGES[activeImageIndex];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  const unitPrice = selectedPackage.salePrice;
  const saleTotalPrice = unitPrice * quantity;

  // Pre-generate WhatsApp message
  const waText = encodeURIComponent(
    `আসসালামু আলাইকুম! আমি Jhilmill থেকে "${selectedPackage.bengaliName}" (${quantity} টি) অর্ডার করতে আগ্রহী। মোট মূল্য: ৳${saleTotalPrice}। বিস্তারিত জানাবেন প্লিজ।`
  );
  const whatsappUrl = `https://wa.me/8801700000000?text=${waText}`;

  return (
    <section className="py-6 sm:py-12 px-3 sm:px-6 max-w-6xl mx-auto w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start w-full max-w-full">
        {/* Left Column: Interactive Product Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 w-full max-w-full">
          {/* Main Visual Display */}
          <div className="relative rounded-2xl overflow-hidden bg-[#f7f3eb] border border-[#e8dfcf] shadow-sm aspect-4/3 sm:aspect-square flex items-center justify-center group w-full">
            <img
              src={activeImg.url}
              alt={activeImg.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
              <span className="bg-[#1e1b18]/90 text-[#f5d77f] text-[11px] font-bengali font-semibold px-2.5 py-1 rounded shadow-xs backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                ১৮ ক্যারেট গোল্ড প্লেটেড
              </span>
              <span className="bg-[#9e2a2b]/95 text-white text-[11px] font-bengali font-semibold px-2.5 py-1 rounded shadow-xs flex items-center gap-1">
                <Heart className="w-3 h-3 fill-current" />
                রোমান্টিক হার্ট চার্ম
              </span>
            </div>

            {/* Lightbox / Zoom Trigger */}
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="ছবি বড় করে দেখুন"
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#211c19] rounded-full shadow-md backdrop-blur-xs transition-transform hover:scale-110 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Carousel Arrow Controls */}
            <button
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-[#211c19] rounded-full shadow-md transition-opacity opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-[#211c19] rounded-full shadow-md transition-opacity opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 inset-x-3 bg-[#1e1b18]/80 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-lg text-center font-bengali">
              <p className="font-semibold text-[#f5d77f]">{activeImg.title}</p>
              <p className="text-[11px] text-stone-300">{activeImg.subtitle}</p>
            </div>
          </div>

          {/* Thumbnail Strip (7 Real User Images) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 w-full max-w-full scrollbar-none">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#b38622] shadow-sm scale-102 ring-2 ring-[#d4af37]/30'
                    : 'border-[#e0d6c4] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Trust Guarantees Bar Below Gallery */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2.5 sm:p-3 bg-[#fbf8f2] rounded-xl border border-[#ede3d3] text-center font-bengali text-[11px] sm:text-xs text-[#524436] w-full max-w-full">
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2d7a46]" />
              <span className="font-semibold text-[11px] sm:text-xs">১০০% কালার গ্যারান্টি</span>
              <span className="text-[9px] sm:text-[10px] text-stone-500">পানি বা ঘামে নষ্ট হয় না</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1 border-x border-[#ede3d3] px-1">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#b38622]" />
              <span className="font-semibold text-[11px] sm:text-xs">লাক্সারি গিফট বক্স</span>
              <span className="text-[9px] sm:text-[10px] text-stone-500">উপহার দেওয়ার প্রস্তুত</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2d7a46]" />
              <span className="font-semibold text-[11px] sm:text-xs">দেখে পেমেন্ট করুন</span>
              <span className="text-[9px] sm:text-[10px] text-stone-500">ক্যাশ অন হোম ডেলিভারি</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 w-full max-w-full">
          {/* Brand & Category Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs font-serif-luxury uppercase tracking-widest text-[#94784a] font-bold">
              Exclusive Luxury Jewelry Collection
            </span>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#2b7241] bg-[#eef7f0] px-2 py-0.5 rounded font-bengali font-semibold">
              <Check className="w-3 h-3" /> স্টকে এভেইলেবল
            </div>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="font-serif-luxury text-xl sm:text-3xl lg:text-4xl font-bold text-[#1f1b18] leading-tight text-balance">
              18K Gold Plated Luxury Snake Payel with Romantic Heart Charm
            </h1>
            <p className="font-bengali text-sm sm:text-lg text-[#57493d] mt-1 font-medium">
              ১৮ ক্যারেট গোল্ড ফিনিশিং লাক্সারি স্নেক চেইন পায়েল · প্রিমিয়াম ভেলভেট গিফট প্যাক
            </p>
          </div>

          {/* Ratings & Social Proof */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bengali text-[#615143] pb-2 border-b border-[#ece2d3]">
            <div className="flex items-center text-[#d4af37]">
              {'★'.repeat(5)}
            </div>
            <span className="font-bold text-[#211c19] tabular-nums">৪.৯/৫</span>
            <span>·</span>
            <span className="text-[#94784a] font-medium">১৮৪+ কাস্টমার রিভিউ</span>
            <span>·</span>
            <span className="text-[#2b7241] font-semibold">৫২০+ সফল ডেলিভারি</span>
          </div>

          {/* Pricing Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-linear-to-r from-[#faf5eb] via-[#fffdf9] to-[#faf5eb] border border-[#e8ddcc] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs sm:text-sm font-bengali font-bold text-[#94784a] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#b38622]" />
                বিশেষ অফার: এক জোড়া পায়েল ৬৯০ টাকা
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#9e2a2b] tabular-nums">
                  ৳{selectedPackage.salePrice}
                </span>
                <span className="text-sm sm:text-base text-stone-400 line-through tabular-nums font-bengali">
                  ৳{selectedPackage.regularPrice}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#9e2a2b] text-white text-xs font-bengali font-bold px-2.5 py-1 rounded shadow-2xs">
                সেভ করুন ৳{selectedPackage.savings} (৩০% ছাড়)
              </span>
              <p className="text-[10px] sm:text-[11px] text-[#786755] font-bengali mt-0.5">
                ✓ কোনো অগ্রিম টাকা ছাড়াই ক্যাশ অন ডেলিভারি
              </p>
            </div>
          </div>


          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1 w-full max-w-full">
            <button
              onClick={onScrollToCheckout}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl font-bengali font-bold text-sm sm:text-lg text-white bg-linear-to-r from-[#a37920] via-[#c99f36] to-[#a37920] hover:brightness-105 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="truncate">এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
            </button>

            <div className="w-full">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 sm:px-4 rounded-xl border border-[#25d366]/40 bg-[#f0fbf4] hover:bg-[#e4f8ec] text-[#1e753b] font-bengali font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25d366] shrink-0" />
                <span className="truncate">হোয়াটসঅ্যাপে যোগাযোগ করে অর্ডার করুন</span>
              </a>
            </div>
          </div>

          {/* Quick Guarantees */}
          <div className="p-3 bg-[#fdfcf9] rounded-xl border border-[#e8dfcf] space-y-1.5 font-bengali text-xs text-[#524538] w-full">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2d7a46] shrink-0" />
              <span>সারা বাংলাদেশে হোম ডেলিভারি (ঢাকার ভেতর ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ দিন)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2d7a46] shrink-0" />
              <span>পণ্য হাতে পেয়ে খুলে কোয়ালিটি দেখে মূল্য পরিশোধের ১০০% সুযোগ</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2d7a46] shrink-0" />
              <span>১৮ ক্যারেট গোল্ড প্লেটিং - নিয়মিত ব্যবহারে রঙ বিবর্ণ হবে না</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImg.url}
              alt={activeImg.title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] sm:max-h-[75vh] w-auto mx-auto object-contain"
            />
            <div className="p-3.5 sm:p-4 bg-stone-950 text-white flex items-center justify-between font-bengali">
              <div>
                <h3 className="font-bold text-[#f5d77f] text-xs sm:text-base">
                  {activeImg.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-400">{activeImg.subtitle}</p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="px-3 sm:px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
