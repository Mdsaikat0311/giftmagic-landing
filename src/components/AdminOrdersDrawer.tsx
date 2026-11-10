import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Clock, Truck, Trash2, X, Phone, MapPin, Gift } from 'lucide-react';
import { CustomerOrder } from '../types';

interface AdminOrdersDrawerProps {
  onClose: () => void;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({ onClose }) => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jhilmill_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateStatus = (id: string, newStatus: CustomerOrder['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('jhilmill_orders', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('আপনি কি সব সংরক্ষিত টেস্ট অর্ডার মুছে ফেলতে চান?')) {
      localStorage.removeItem('jhilmill_orders');
      setOrders([]);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col font-bengali">
        {/* Header */}
        <div className="p-5 border-b border-[#e5d8c3] bg-[#faf6ee] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#211c19] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#b38622]" />
              অর্ডার ড্যাশবোর্ড (ম্যানেজার প্যানেল)
            </h3>
            <p className="text-xs text-[#705e4d]">
              সর্বমোট {orders.length} টি অর্ডার · সংগৃহীত মোট: ৳{totalRevenue}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-black rounded-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-2" />
              এখনও কোনো নতুন অর্ডার আসেনি।
              <p className="text-xs text-stone-400 mt-1">
                ওয়েবসাইট থেকে ফর্ম পূরণ করে টেস্ট অর্ডার করুন।
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl border border-[#e5d8c3] bg-[#fdfcf9] space-y-3 shadow-2xs"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#9e2a2b]">#{ord.id}</span>
                    <h4 className="font-bold text-sm text-[#211c19]">{ord.customerName}</h4>
                    <span className="text-[11px] text-stone-400">{ord.createdAt}</span>
                  </div>

                  <select
                    value={ord.status}
                    onChange={(e) =>
                      updateStatus(ord.id, e.target.value as CustomerOrder['status'])
                    }
                    className="text-xs p-1.5 rounded-lg border border-[#d8ccba] bg-white font-semibold cursor-pointer"
                  >
                    <option value="Pending">Pending (অপেক্ষমাণ)</option>
                    <option value="Confirmed">Confirmed (কনফার্মড)</option>
                    <option value="Shipped">Shipped (কুরিয়ারে)</option>
                    <option value="Delivered">Delivered (ডেলিভারড)</option>
                  </select>
                </div>

                <div className="space-y-1 text-xs text-[#4b3f33] bg-[#f7f2e7] p-2.5 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#9e7626]" />
                    <a href={`tel:${ord.phone}`} className="font-bold text-[#9e2a2b] hover:underline">
                      {ord.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#9e7626] shrink-0 mt-0.5" />
                    <span>{ord.address} ({ord.deliveryArea === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})</span>
                  </div>
                  <div className="pt-1 border-t border-[#ebdcc7] flex justify-between font-bold">
                    <span>
                      {ord.packageName} × {ord.quantity}
                    </span>
                    <span className="text-[#9e2a2b]">৳{ord.total} (ক্যাশ অন ডেলিভারি)</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {orders.length > 0 && (
          <div className="p-4 border-t border-[#e5d8c3] bg-white flex justify-between items-center">
            <button
              onClick={clearAll}
              className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> ডেটা ক্লিয়ার করুন
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#211c19] text-[#f5d77f] text-xs font-semibold rounded-lg cursor-pointer"
            >
              ড্যাশবোর্ড বন্ধ করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
