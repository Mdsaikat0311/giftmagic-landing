import React from 'react';
import { Sparkles, Shield, Heart, Droplets, Sliders, Gift } from 'lucide-react';

export const CraftsmanshipFeatures: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: '১৮ ক্যারেট গোল্ড প্লেটিং',
      description:
        'উন্নত ইলেকট্রোপ্লেটিং প্রযুক্তিতে ১৮ ক্যারেট খাঁটি সোনার আবরণ দেওয়া, যা আসল সোনার মতোই উজ্জ্বল ও দ্যুতিময় দেখায়।',
    },
    {
      icon: Sliders,
      title: 'মসৃণ ফ্ল্যাট স্নেক চেইন',
      description:
        'হেরিংবোন প্যাটার্নের নমনীয় চেইন যা পায়ে নিখুঁতভাবে জড়িয়ে থাকে। কাপড়ে বা ত্বকে কোনো টান বা অস্বস্তি তৈরি করে না।',
    },
    {
      icon: Heart,
      title: 'রোমান্টিক গোল্ডেন হার্ট চার্ম',
      description:
        'লবস্টার লকের প্রান্তে ঝুলন্ত মিনি হার্ট লকেট যা পায়ে পরলে এক অপরূপ মিষ্টি ও আধুনিক লুক তৈরি করে।',
    },
    {
      icon: Droplets,
      title: '৩ বছরের কালার গ্যারান্টি (১০০% ওয়াটারপ্রুফ)',
      description:
        'পানি, ঘাম বা সাবানের সংস্পর্শেও কালার বিবর্ণ বা কালো হয় না। টানা ৩ বছরেও রঙ ওঠার কোনো ভয় নেই।',
    },
    {
      icon: Shield,
      title: 'নন-অ্যালার্জিক স্টেইনলেস স্টিল',
      description:
        'উচ্চমানের সার্জিক্যাল গ্রেড স্টিল দিয়ে তৈরি। সংবেদনশীল ত্বকেও কোনো র‍্যাশ বা চুলকানি সৃষ্টি করে না।',
    },
    {
      icon: Gift,
      title: 'লাক্সারি গিফট প্যাকেজিং',
      description:
        'প্রিয়জনকে উপহার দেওয়ার জন্য প্রিমিয়াম জুয়েলারি বক্স ও আকর্ষণীয় প্যাকেজিংয়ে সাজানো থাকে।',
    },
  ];

  return (
    <section id="details" className="py-10 sm:py-16 bg-[#f8f5ee] border-t border-[#e8ddcc] w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#94784a] font-bold">
            Superior Craftsmanship & Design
          </span>
          <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#211c19] mt-1.5 font-bengali">
            কেন এই ১৮ ক্যারেট গোল্ড প্লেটেড স্নেক পায়েলটি সেরা উপহার?
          </h2>

          {/* Highlighted 3 Years Color Guarantee Banner */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 mt-3 rounded-full bg-linear-to-r from-[#9e2a2b] via-[#b83335] to-[#9e2a2b] text-white shadow-md border border-[#ffd778]/40 font-bengali text-xs sm:text-sm font-bold">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd778] shrink-0" />
            <span>৩ বছরের কালার গ্যারান্টি — ৩ বছরেও রঙ উঠবে না!</span>
          </div>

          <p className="text-xs sm:text-sm font-bengali text-[#695a4c] mt-2.5">
            বাজারের সাধারণ ইমিটেশন জুয়েলারির মতো রঙ উঠে যায় না। খাঁটি রাজকীয় ফিনিশিং ও দীর্ঘস্থায়ী স্থায়িত্বের নিখুঁত সংমিশ্রণ।
          </p>
        </div>

        {/* Feature Cards Grid (2 per row on mobile & compact layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-[#e8dfcf] shadow-2xs hover:shadow-xs transition-shadow flex flex-col gap-2 sm:gap-2.5 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#faf5eb] border border-[#e5d8c3] flex items-center justify-center text-[#9e7626] group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#9e7626]" />
                </div>
                <h3 className="font-bengali font-bold text-xs sm:text-base text-[#211c19] group-hover:text-[#9e2a2b] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="font-bengali text-[11px] sm:text-xs text-[#665749] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visual Craftsmanship Strip */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-8 rounded-2xl bg-white border border-[#e5d8c3] flex flex-col lg:flex-row items-center justify-between gap-6 w-full max-w-full overflow-hidden">
          <div className="flex-1 space-y-2 font-bengali text-center lg:text-left">
            <span className="text-xs font-semibold text-[#9e7626] uppercase tracking-wider">
              ১০০% খাঁটি অনুভূতির নিশ্চয়তা
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-[#211c19]">
              পায়ে পরলে মনে হবে খাঁটি সোনার জুয়েলারি
            </h3>
            <p className="text-xs sm:text-sm text-[#615143] leading-relaxed">
              যেকোনো শাড়ি, লেহেঙ্গা, কুর্তি বা ওয়েস্টার্ন ড্রেসের সাথে এই স্লিক স্নেক পায়েল মানিয়ে যায়। এর নরম ফিনিশিং পায়ে কোনো দাগ তৈরি করে না।
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-full overflow-x-auto pb-1">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#e0d3be] shadow-2xs shrink-0">
              <img
                src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg"
                alt="Worn detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#e0d3be] shadow-2xs shrink-0">
              <img
                src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-3_b875b21b.jpg"
                alt="Stand detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#e0d3be] shadow-2xs shrink-0">
              <img
                src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-6_5f331376.jpg"
                alt="Flat layout"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
