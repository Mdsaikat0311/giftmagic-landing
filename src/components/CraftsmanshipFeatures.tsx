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
      title: '১০০% ওয়াটারপ্রুফ ও নো-ফেড',
      description:
        'পানি, ঘাম বা সাবানের সংস্পর্শেও কালার বিবর্ণ বা কালো হয় না। প্রতিদিন গোসলের সময় পরে থাকলেও নষ্ট হবে না।',
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
        'প্রিয়জনকে উপহার দেওয়ার জন্য রয়্যাল ভেলভেট বক্স ও স্পেশাল রিবন দিয়ে নিখুঁতভাবে সাজানো থাকে।',
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
          <p className="text-xs sm:text-sm font-bengali text-[#695a4c] mt-2">
            বাজারের সাধারণ ইমিটেশন জুয়েলারির মতো রঙ উঠে যায় না। খাঁটি রাজকীয় ফিনিশিং ও দীর্ঘস্থায়ী স্থায়িত্বের নিখুঁত সংমিশ্রণ।
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e8dfcf] shadow-2xs hover:shadow-xs transition-shadow flex flex-col gap-3 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#faf5eb] border border-[#e5d8c3] flex items-center justify-center text-[#9e7626] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-[#9e7626]" />
                </div>
                <h3 className="font-bengali font-bold text-base text-[#211c19] group-hover:text-[#9e2a2b] transition-colors">
                  {item.title}
                </h3>
                <p className="font-bengali text-xs sm:text-sm text-[#665749] leading-relaxed">
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
