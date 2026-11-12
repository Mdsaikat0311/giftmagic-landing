import React from 'react';
import { CheckCircle, Printer, MessageCircle, Truck, Gift, X } from 'lucide-react';
import { CustomerOrder } from '../types';

interface OrderSuccessModalProps {
  order: CustomerOrder;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const whatsappConfirmationText = encodeURIComponent(
    `আসসালামু আলাইকুম! আমি Gift Magic-এ অর্ডার সম্পন্ন করেছি।\nঅর্ডার আইডি: ${order.id}\nনাম: ${order.customerName}\nমোবাইল: ${order.phone}\nপ্যাকেজ: ${order.packageName} (${order.quantity} টি)\nমোট মূল্য: ৳${order.total} (ক্যাশ অন ডেলিভারি)।\nঅনুগ্রহ করে নিশ্চিত করবেন।`
  );
  const whatsappUrl = `https://wa.me/8801700000000?text=${whatsappConfirmationText}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border-2 border-[#d8be8d] shadow-2xl font-bengali my-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#eef7f0] border-2 border-[#81c784] text-[#2d7a46] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle className="w-9 h-9" />
          </div>
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#94784a] font-bold">
            Order Successfully Placed
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#211c19]">
            ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে
          </h3>
          <p className="text-xs sm:text-sm text-[#665749]">
            আমাদের কাস্টমার কেয়ার প্রতিনিধি শিগগিরই আপনার সাথে যোগাযোগ করে অর্ডারটি কনফার্ম করবেন।
          </p>
        </div>

        {/* Invoice Summary Box */}
        <div className="my-5 p-4 rounded-xl bg-[#faf6ee] border border-[#e8dfcf] space-y-2.5 text-xs text-[#42362b]">
          <div className="flex justify-between items-center pb-2 border-b border-[#e2d5c2]">
            <span className="text-stone-500">অর্ডার নম্বর (Order ID):</span>
            <div className="text-right">
              <span className="font-mono font-bold text-sm text-[#9e2a2b]">{order.id}</span>
              {order.wcOrderId && (
                <span className="block text-[10px] text-[#2d7a46] font-bold">
                  ✓ WooCommerce সিঙ্কড্ (#{order.wcOrderId})
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500">গ্রাহকের নাম:</span>
            <span className="font-bold text-[#211c19]">{order.customerName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500">মোবাইল নম্বর:</span>
            <span className="font-mono font-bold text-[#211c19]">{order.phone}</span>
          </div>

          <div className="flex justify-between items-start gap-3">
            <span className="text-stone-500 shrink-0">ডেলিভারি ঠিকানা:</span>
            <span className="text-right text-[#211c19]">{order.address}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#e2d5c2]">
            <span className="text-stone-500">নির্বাচিত প্যাকেজ:</span>
            <span className="font-bold text-[#211c19]">
              {order.packageName} × {order.quantity}
            </span>
          </div>

          {order.includeKidsPayel && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500">+ বাচ্চা মেয়েদের পায়েল:</span>
              <span className="font-bold text-[#9e2a2b]">১ জোড়া (+৳{order.kidsPayelPrice || 499})</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-stone-500">ডেলিভারি চার্জ:</span>
            <span className="font-mono font-bold">৳{order.deliveryFee}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#e2d5c2] text-sm">
            <span className="font-bold text-[#211c19]">সর্বমোট প্রদেয় টাকা (COD):</span>
            <span className="font-serif-luxury font-bold text-lg text-[#9e2a2b]">
              ৳{order.total}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            হোয়াটসঅ্যাপে অর্ডারের বিস্তারিত পাঠান
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="py-2 px-3 rounded-xl border border-[#d8ccba] hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              মেমো প্রিন্ট করুন
            </button>
            <button
              onClick={onClose}
              className="py-2 px-3 rounded-xl bg-[#211c19] hover:bg-[#3d332a] text-[#f5d77f] font-semibold text-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
