import React, { useState } from 'react';
import { Maximize2, Sparkles, Heart } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

export const PhotoLookbook: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<(typeof PRODUCT_IMAGES)[0] | null>(null);

  return (
    <section className="py-10 sm:py-16 bg-white border-t border-[#e8ddcc] w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#94784a] font-bold">
            Real Customer & Studio Lookbook
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#211c19] mt-1.5 font-bengali">
            আসল পণ্যের প্রতিটি সূক্ষ্ম কোণ থেকে তোলা ছবি
          </h2>
          <p className="text-sm font-bengali text-[#6b5c4d] mt-2">
            আমরা কোনো ফেক বা এডিটেড ছবি ব্যবহার করি না। যে ছবিগুলো দেখছেন, ডেলিভারিতে হুবহু একই প্রিমিয়াম পণ্য পাবেন।
          </p>
        </div>

        {/* Masonry / Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRODUCT_IMAGES.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setSelectedImg(img)}
              className={`relative rounded-xl overflow-hidden border border-[#ede3d3] bg-[#fbf8f2] group cursor-pointer shadow-2xs hover:shadow-md transition-all ${
                index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full min-h-[160px] sm:min-h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5 text-white font-bengali">
                <span className="text-[10px] text-[#f5d77f] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ১৮K গোল্ড ফিনিশ
                </span>
                <p className="text-xs sm:text-sm font-bold mt-0.5">{img.title}</p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-stone-300">
                  <span>{img.subtitle}</span>
                  <Maximize2 className="w-3.5 h-3.5 text-white/80" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Commitment Callout */}
        <div className="mt-8 p-4 rounded-xl bg-[#faf6ee] border border-[#e8dfcf] flex items-center justify-center gap-2 text-center text-xs font-bengali text-[#635343]">
          <Heart className="w-4 h-4 text-[#9e2a2b] fill-current shrink-0" />
          <span>
            গিফট ম্যাজিক প্রতিশ্রুতি: ছবির সাথে বাস্তবের মিল না পেলে ডেলিভারি চার্জ ছাড়াই তাৎক্ষণিক ফেরত দেওয়ার সুবিধা রয়েছে।
          </span>
        </div>
      </div>

      {/* Enlarged Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-3xl bg-stone-900 rounded-2xl overflow-hidden border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg.url}
              alt={selectedImg.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            <div className="p-4 bg-stone-950 text-white flex items-center justify-between font-bengali">
              <div>
                <h4 className="font-bold text-[#f5d77f]">{selectedImg.title}</h4>
                <p className="text-xs text-stone-400">{selectedImg.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedImg(null)}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors cursor-pointer"
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
