import React, { useState } from 'react';
import { Search, Package, Clock, Truck, CheckCircle2, X } from 'lucide-react';
import { CustomerOrder } from '../types';

interface OrderTrackerModalProps {
  onClose: () => void;
  onOpenAdmin: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  onClose,
  onOpenAdmin,
}) => {
  const [query, setQuery] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<CustomerOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    try {
      const stored = localStorage.getItem('giftmagic_orders') || localStorage.getItem('jhilmill_orders');
      if (stored) {
        const orders: CustomerOrder[] = JSON.parse(stored);
        const match = orders.find(
          (o) =>
            o.id.toLowerCase() === clean ||
            o.phone.replace(/[^0-9]/g, '') === clean.replace(/[^0-9]/g, '')
        );
        setMatchedOrder(match || null);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    setMatchedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 border border-[#d8ccba] shadow-2xl font-bengali space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ece2d3] pb-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#9e7626]" />
            <h3 className="font-bold text-base text-[#211c19]">অর্ডার ট্র্যাকিং</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-black cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#6e5e50]">
          আপনার ১১ ডিজিটের মোবাইল নম্বর অথবা অর্ডার আইডি (উদা: JS-XXXXXX) লিখে স্ট্যাটাস দেখুন:
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="মোবাইল নম্বর বা অর্ডার আইডি"
            className="flex-1 p-2.5 text-xs rounded-xl border border-[#d8ccba] focus:outline-none focus:ring-1 focus:ring-[#b38622]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#b38622] hover:bg-[#996f18] text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            খুঁজুন
          </button>
        </form>

        {/* Result Area */}
        {searched && (
          <div className="pt-2">
            {matchedOrder ? (
              <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#e8dfcf] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#e2d5c2]">
                  <div>
                    <span className="text-[11px] text-stone-500">অর্ডার নম্বর:</span>
                    <span className="font-mono font-bold text-xs text-[#9e2a2b] ml-1">
                      {matchedOrder.id}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#eef7f0] text-[#2d7a46]">
                    ● {matchedOrder.status === 'Pending' ? 'কনফার্মেশন প্রক্রিয়াধীন' : matchedOrder.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[#42362b]">
                  <p>
                    <span className="text-stone-500">গ্রাহক:</span> {matchedOrder.customerName}
                  </p>
                  <p>
                    <span className="text-stone-500">আইটেম:</span> {matchedOrder.packageName} (
                    {matchedOrder.quantity} টি)
                  </p>
                  <p>
                    <span className="text-stone-500">মোট টাকা:</span> ৳{matchedOrder.total} (ক্যাশ অন
                    ডেলিভারি)
                  </p>
                </div>

                {/* Tracking Step Progression */}
                <div className="pt-3 border-t border-[#e2d5c2] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#2d7a46]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>অর্ডার গ্রহণ সম্পন্ন</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#9e7626]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>উপহার প্যাকিং ও ভেরিফিকেশন চলছে</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>কুরিয়ারে হস্তান্তর (শীঘ্রই)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-600">
                এই নম্বরে কোনো অর্ডার পাওয়া যায়নি। সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন অথবা আমাদের কল করুন।
              </div>
            )}
          </div>
        )}

        {/* Footer Admin Link */}
        <div className="pt-2 border-t border-[#ece2d3] flex items-center justify-between text-[11px]">
          <span className="text-stone-400">Gift Magic Customer Portal</span>
          <button
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="text-[#9e7626] hover:underline cursor-pointer"
          >
            অর্ডার ড্যাশবোর্ড (ম্যানেজার)
          </button>
        </div>
      </div>
    </div>
  );
};
