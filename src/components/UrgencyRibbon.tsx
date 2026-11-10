import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Flame, Gift, RefreshCw } from 'lucide-react';

export const UrgencyRibbon: React.FC = () => {
  // 6-hour dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 47,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-[#fff9f0] border-y border-[#eddcc4] py-2.5 sm:py-3 px-3 sm:px-4 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs sm:text-sm font-bengali text-[#4b3f33]">
        {/* Urgency Stock Info */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-[#a82527] bg-[#ffe4e4] px-2.5 py-1 rounded text-xs">
            <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
            সীমিত স্টক: আজকের জন্য মাত্র ৭ পিস বাকি!
          </span>
          <span className="hidden sm:inline text-[#786b5e]">
            · যেকোনো মুহূর্তে ডিসকাউন্ট শেষ হতে পারে
          </span>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#9c721d]" />
          <span className="font-medium text-[#6b5842]">অফারের সময় বাকি:</span>
          <div className="flex items-center gap-1 font-mono font-bold text-xs text-[#211c19]">
            <span className="bg-[#f0e3cc] px-2 py-0.5 rounded shadow-2xs">
              {formatNum(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="bg-[#f0e3cc] px-2 py-0.5 rounded shadow-2xs">
              {formatNum(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="bg-[#f0e3cc] px-2 py-0.5 rounded shadow-2xs text-[#a82527]">
              {formatNum(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="flex items-center gap-3 text-xs text-[#6e5d4a]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2d7a46]" /> ১০০% নিরাপদ চেকআউট
          </span>
          <span className="hidden lg:flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-[#b38622]" /> ফ্রি লাক্সারি গিফট প্যাকেজিং
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-[#2d7a46]" /> ৭ দিনের সহজ রিটার্ন
          </span>
        </div>
      </div>
    </div>
  );
};
