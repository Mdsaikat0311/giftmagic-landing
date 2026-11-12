import React from 'react';
import { Gift, Heart, Sparkles, PackageCheck, Send, CheckCircle2 } from 'lucide-react';

interface GiftExperienceProps {
  onScrollToOrder: () => void;
}

export const GiftExperienceSection: React.FC<GiftExperienceProps> = ({ onScrollToOrder }) => {
  return (
    <section id="packaging" className="py-10 sm:py-16 bg-[#fcfaf6] border-t border-[#e8dfcf] w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#9e2a2b] font-bold">
            The Ultimate Gifting Experience
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#211c19] mt-1.5 font-bengali">
            প্রিয়জনের মুখে ভালোবাসার অমূল্য হাসি ফোটান
          </h2>
          <p className="text-xs sm:text-sm font-bengali text-[#665749] mt-2">
            একটি পায়েল শুধুই জুয়েলারি নয়, এটি ভালোবাসার চিরন্তন পরশ। জন্মদিন, বিবাহবার্ষিকী কিংবা স্পেশাল কোনো সারপ্রাইজের জন্য এক অনবদ্য উপহার।
          </p>
        </div>

        {/* 2-Column Gift Presentation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: The Visual Box Experience */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#e5d8c3] shadow-sm bg-white">
              <img
                src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-3_b875b21b.jpg"
                alt="Luxury Gift Presentation"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white font-bengali">
                <span className="text-xs text-[#f5d77f] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> রয়্যাল গোল্ডেন প্রেজেন্টেশন
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-1">
                  লাক্সারি গোল্ডেন জুয়েলারি গিফট বক্স ও প্রিমিয়াম প্রেজেন্টেশন
                </h3>
                <p className="text-xs text-stone-200 mt-1">
                  প্রতিটি কম্বোতে যুক্ত থাকে প্রিমিয়াম জুয়েলারি গিফট বক্স ও আকর্ষণীয় প্রেজেন্টেশন
                </p>
              </div>
            </div>

            {/* 3 Pillars of Gifting */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-[#ede3d3] text-center font-bengali">
                <Heart className="w-5 h-5 text-[#9e2a2b] mx-auto mb-1" />
                <h4 className="font-bold text-xs text-[#26201a]">হৃদয়স্পর্শী অনুভূতি</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">সবচেয়ে আদরের উপহার</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#ede3d3] text-center font-bengali">
                <PackageCheck className="w-5 h-5 text-[#b38622] mx-auto mb-1" />
                <h4 className="font-bold text-xs text-[#26201a]">লাক্সারি প্যাকেজিং</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">ভেলভেট বক্স ও রিবন</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#ede3d3] text-center font-bengali">
                <Send className="w-5 h-5 text-[#2d7a46] mx-auto mb-1" />
                <h4 className="font-bold text-xs text-[#26201a]">সারপ্রাইজ ডেলিভারি</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">গোপনে পাঠানোর ব্যবস্থা</p>
              </div>
            </div>
          </div>

          {/* Right: Luxury Packaging Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-4 font-bengali">
            <div className="p-6 rounded-2xl bg-linear-to-br from-[#faf4e6] to-[#f5ebd3] border-2 border-[#d8be8d] shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 pb-3 border-b border-[#e5d0a6]">
                <Gift className="w-5 h-5 text-[#9e2a2b]" />
                <h3 className="font-serif-luxury font-bold text-base tracking-wider text-[#856119]">
                  লাক্সারি জুয়েলারি গিফট প্যাকেজিং
                </h3>
              </div>

              <div className="py-4 space-y-3.5 text-xs text-[#4b3c2c]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2d7a46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#261f18]">প্রিমিয়াম জুয়েলারি গিফট বক্স:</span>
                    <p className="text-stone-600 mt-0.5">
                      পায়েল সুরক্ষিত ও স্ক্র্যাচ-ফ্রি রাখার জন্য আকর্ষণীয় বক্স প্যাকেজিং, যা কাউকে সরাসরি গিফট করার জন্য ১০০% প্রস্তুত।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2d7a46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#261f18]">১৮ ক্যারেট গোল্ড প্লেটিং ও প্রিমিয়াম পলিশ:</span>
                    <p className="text-stone-600 mt-0.5">
                      খাঁটি স্টেইনলেস স্টিল বেস এবং উন্নত গোল্ড প্লেটিং, যা সম্পূর্ণ ওয়াটারপ্রুফ এবং নিয়মিত ব্যবহারে এর উজ্জ্বলতা নষ্ট হয় না।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2d7a46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#261f18]">রোমান্টিক হার্ট চার্ম ও অ্যাডজাস্টেবল চেইন:</span>
                    <p className="text-stone-600 mt-0.5">
                      পায়ে দারুণভাবে মানিয়ে যাওয়ার জন্য সাথে রয়েছে কিউট গোল্ড হার্ট লকেট এবং যেকোনো সাইজের পায়ে ফিট হওয়ার এক্সটেনশন লুপ।
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5d0a6] text-[11px] text-[#735823]">
                ★ উপহার হিসেবে সরাসরি প্রিয়জনের ঠিকানায় পাঠাতে চান? নিশ্চিন্তে অর্ডার করুন, আমরা নিখুঁতভাবে পৌঁছে দেব।
              </div>
            </div>

            {/* Gift Bundle CTA */}
            <div className="p-4 bg-white rounded-xl border border-[#e5d8c3] flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-[#211c19]">
                  প্রিয়জনকে রাজকীয় উপহার দিতে চান?
                </div>
                <div className="text-xs text-[#6e5e50]">
                  ক্যাশ অন ডেলিভারিতে অর্ডার করুন, পণ্য হাতে পেয়ে মূল্য দিন।
                </div>
              </div>
              <button
                onClick={onScrollToOrder}
                className="px-4 py-2 bg-[#9e2a2b] hover:bg-[#802021] text-white text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer"
              >
                গিফট বুক করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
