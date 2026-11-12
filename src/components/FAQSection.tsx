import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PRODUCT_FAQS } from '../data/productData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-10 sm:py-16 bg-[#f7f4ec] border-t border-[#e8ddcc] w-full max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#94784a] font-bold">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#211c19] mt-1.5 font-bengali">
            সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর
          </h2>
          <p className="text-sm font-bengali text-[#665749] mt-2">
            অর্ডার করার পূর্বে যেকোনো দ্বিধা দূর করতে নিচের উত্তরগুলো দেখে নিতে পারেন।
          </p>
        </div>

        <div className="space-y-3 font-bengali">
          {PRODUCT_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#e5d8c3] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#211c19] hover:bg-[#faf7f0] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xs text-[#b38622] font-mono">০{idx + 1}.</span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#94784a] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#57493d] leading-relaxed border-t border-[#f0e7d8] pt-3 bg-[#fdfcf9]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
