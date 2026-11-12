import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onScrollToOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onOpenAdmin,
  onScrollToOrder,
}) => {
  return (
    <footer className="bg-[#1b1714] text-[#e0d6c5] border-t-2 border-[#916e1e] font-bengali pt-10 pb-24 md:pb-12 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#3b3228]">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#c99f36] to-[#916e1e] flex items-center justify-center text-white font-serif-luxury font-bold text-lg">
                G
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#f5d77f]">
                GIFT MAGIC
              </span>
            </div>
            <p className="text-xs text-[#b8a994] leading-relaxed">
              গিফট ম্যাজিক - বাংলাদেশের বিশ্বস্ত লাক্সারি জুয়েলারি ও উপহার শপ। খাঁটি ১৮ ক্যারেট গোল্ড প্লেটেড জুয়েলারির মাধ্যমে প্রিয়জনের মুখে নিখাদ আনন্দ ফোটানোই আমাদের লক্ষ্য।
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>১০০% কোয়ালিটি গ্যারান্টিযুক্ত জুয়েলারি</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-[#f5d77f] uppercase tracking-wider font-serif-luxury">
              দরকারী লিংকসমূহ
            </h4>
            <ul className="space-y-1.5 text-xs text-[#b8a994]">
              <li>
                <a href="#details" className="hover:text-white transition-colors">
                  পায়েল বিবরণী ও বৈশিষ্ট্য
                </a>
              </li>
              <li>
                <a href="#packaging" className="hover:text-white transition-colors">
                  ভেলভেট গিফট বক্স ও চিরকুট
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  কাস্টমার রিভিউ ও রেটিং
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  অর্ডার ট্র্যাকিং (Order Track)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Assurance */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-[#f5d77f] uppercase tracking-wider font-serif-luxury">
              নিরাপদ কেনাকাটা
            </h4>
            <div className="space-y-2 text-xs text-[#b8a994]">
              <p className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2d7a46] shrink-0 mt-0.5" />
                <span>সারা বাংলাদেশে ক্যাশ অন হোম ডেলিভারি</span>
              </p>
              <p className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2d7a46] shrink-0 mt-0.5" />
                <span>প্যাকেজ খুলে পণ্য দেখে মূল্য পরিশোধ</span>
              </p>
              <p className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2d7a46] shrink-0 mt-0.5" />
                <span>৭ দিনের সহজ রিটার্ন ও এক্সচেঞ্জ পলিসি</span>
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-[#f5d77f] uppercase tracking-wider font-serif-luxury">
              যোগাযোগ ও সহায়তা
            </h4>
            <div className="space-y-2 text-xs text-[#b8a994]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href="tel:01700000000" className="hover:text-white">
                  01700-000000 (সকাল ৯টা - রাত ১১টা)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>support@giftmagic.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>হাউজ ১২, রোড ৫, সেক্টর ৭, উত্তরা, ঢাকা-১২৩০</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8c7f6f]">
          <p>© ২০২৬ গিফট ম্যাজিক (Gift Magic BD). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onScrollToOrder}
              className="text-[#f5d77f] hover:underline cursor-pointer"
            >
              এখনই অর্ডার করুন
            </button>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              দোকানদার ড্যাশবোর্ড
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
