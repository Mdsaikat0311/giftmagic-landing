import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  CheckCircle,
  Clock,
  Truck,
  Trash2,
  X,
  Phone,
  MapPin,
  Gift,
  Settings,
  Activity,
  Check,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { CustomerOrder } from '../types';
import {
  getStoredPixelId,
  setStoredPixelId,
  trackPageView,
} from '../utils/tracking';
import {
  getStoredWcSettings,
  saveStoredWcSettings,
} from '../services/wooCommerceService';

interface AdminOrdersDrawerProps {
  onClose: () => void;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'integration'>('orders');
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  // Pixel and WC states
  const [pixelId, setPixelId] = useState('');
  const [wcSettings, setWcSettings] = useState({ wcUrl: '', wcCk: '', wcCs: '' });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testPixelSent, setTestPixelSent] = useState(false);
  const [bridgeStatus, setBridgeStatus] = useState<'checking' | 'ready' | 'standalone'>('checking');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('giftmagic_orders') || localStorage.getItem('jhilmill_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
      setPixelId(getStoredPixelId());
      setWcSettings(getStoredWcSettings());
    } catch (e) {
      console.error(e);
    }

    // Check order-bridge.php status
    fetch('./order-bridge.php', { method: 'OPTIONS' })
      .then((res) => {
        if (res.ok) setBridgeStatus('ready');
        else setBridgeStatus('standalone');
      })
      .catch(() => setBridgeStatus('standalone'));
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredPixelId(pixelId);
    saveStoredWcSettings(wcSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestPixel = () => {
    trackPageView();
    setTestPixelSent(true);
    setTimeout(() => setTestPixelSent(false), 2500);
  };

  const updateStatus = (id: string, newStatus: CustomerOrder['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('giftmagic_orders', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('আপনি কি সব সংরক্ষিত টেস্ট অর্ডার মুছে ফেলতে চান?')) {
      localStorage.removeItem('giftmagic_orders');
      localStorage.removeItem('jhilmill_orders');
      setOrders([]);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const hasParentPixel = typeof window !== 'undefined' && Boolean(window.fbq);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col font-bengali">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e5d8c3] bg-[#faf6ee] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#211c19] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#b38622]" />
              অর্ডার ও ওয়ার্ডপ্রেস ম্যানেজার প্যানেল
            </h3>
            <p className="text-xs text-[#705e4d]">
              সর্বমোট {orders.length} টি অর্ডার · মোট বিক্রয়: ৳{totalRevenue}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-black rounded-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#e5d8c3] bg-white">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#b38622] text-[#9e7626] bg-[#fdfcf9]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            অর্ডার তালিকা ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('integration')}
            className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'integration'
                ? 'border-[#b38622] text-[#9e7626] bg-[#fdfcf9]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            ওয়ার্ডপ্রেস ও পিক্সেল ইন্টিগ্রেশন
          </button>
        </div>

        {/* Body Content */}
        {activeTab === 'orders' ? (
          /* Orders List */
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
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#9e2a2b]">#{ord.id}</span>
                        {ord.wcOrderId && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            WC #{ord.wcOrderId}
                          </span>
                        )}
                      </div>
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
        ) : (
          /* WordPress & Pixel Integration Tab */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs text-[#2c241e]">
            {/* Automatic WordPress Bridge Status */}
            <div className="p-4 rounded-xl border-2 border-[#d8be8d] bg-[#fdfaf3] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#211c19] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#2d7a46]" />
                  ওয়ার্ডপ্রেস উকমার্স অটো-ব্রিজ (WooCommerce Bridge)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {bridgeStatus === 'ready' ? '✓ ব্রিজিং রেডি' : 'অ্যাক্টিভ (order-bridge.php)'}
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                আপনার তৈরি করা <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">wp-content/landing</code> ফোল্ডারে বিল্ড করা <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">dist/</code> ফাইলগুলো আপলোড করলে সাথে থাকা <code className="text-[#9e2a2b] font-bold">order-bridge.php</code> স্বয়ংক্রিয়ভাবে ওয়ার্ডপ্রেসের সাথে যুক্ত হয়ে যাবে।
              </p>
              <ul className="space-y-1 text-stone-600 list-disc list-inside">
                <li>যেকোনো নতুন কাস্টমার অর্ডার সরাসরি <strong>WooCommerce → Orders</strong>-এ জমা হবে।</li>
                <li>ক্যাশ অন ডেলিভারি (COD) পেমেন্ট মেথড স্বয়ংক্রিয়ভাবে সেট থাকবে।</li>
                <li>গ্রাহকের নাম, ফোন, ঠিকানা ও প্যাকেজ তথ্য স্বয়ংক্রিয়ভাবে ইনভয়েসে চলে যাবে।</li>
              </ul>
            </div>

            {/* Facebook Pixel & Web Tracking */}
            <div className="p-4 rounded-xl border border-[#e5d8c3] bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#211c19] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#9e7626]" />
                  ফেসবুক পিক্সেল ও ট্র্যাকিং (Meta Pixel & GTM)
                </span>
                {hasParentPixel && (
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                    ✓ ওয়ার্ডপ্রেস পিক্সেল ডিটেক্টেড
                  </span>
                )}
              </div>
              <p className="text-stone-600">
                {hasParentPixel
                  ? 'আপনার মূল ওয়ার্ডপ্রেস সাইটে আগে থেকেই মেটা পিক্সেল চালু আছে। ল্যান্ডিং পেজে স্বয়ংক্রিয়ভাবে PageView, InitiateCheckout ও Purchase ইভেন্ট ফায়ার হচ্ছে।'
                  : 'আপনি চাইলে সরাসরি আপনার Facebook Pixel ID এখানে বসাতে পারেন অথবা ওয়ার্ডপ্রেসের PixelYourSite প্লাগইন থাকলে এটা স্বয়ংক্রিয় কাজ করবে।'}
              </p>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Facebook Pixel ID (ঐচ্ছিক):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    placeholder="উদাহরণ: 123456789012345"
                    className="flex-1 p-2 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#b38622] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleTestPixel}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-stone-700 font-bold text-[11px] cursor-pointer whitespace-nowrap"
                  >
                    {testPixelSent ? '✓ ইভেন্ট পাঠানো হয়েছে' : 'পিক্সেল টেস্ট করুন'}
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Cross-Domain WooCommerce REST API */}
            <div className="p-4 rounded-xl border border-[#e5d8c3] bg-white space-y-3">
              <h4 className="font-bold text-sm text-[#211c19]">
                উকমার্স রেস্ট এপিআই (যদি অন্য ডোমেইনে হোস্ট করেন - ঐচ্ছিক)
              </h4>
              <p className="text-stone-500 text-[11px]">
                যদি আপনার এই ল্যান্ডিং পেজটি ওয়ার্ডপ্রেসের বাইরে অন্য কোনো সার্ভার থেকে চালান, তখন নিচের ক্রেডেনশিয়াল দিলে সরাসরি রিমোট উকমার্সে অর্ডার পাঠানো যাবে।
              </p>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-medium text-stone-700">WordPress Site URL</label>
                  <input
                    type="text"
                    value={wcSettings.wcUrl}
                    onChange={(e) => setWcSettings({ ...wcSettings, wcUrl: e.target.value })}
                    placeholder="https://yourstore.com"
                    className="w-full p-2 rounded-lg border border-stone-300 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700">Consumer Key (ck_...)</label>
                    <input
                      type="text"
                      value={wcSettings.wcCk}
                      onChange={(e) => setWcSettings({ ...wcSettings, wcCk: e.target.value })}
                      placeholder="ck_xxxxxxxxxxxx"
                      className="w-full p-2 rounded-lg border border-stone-300 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700">Consumer Secret (cs_...)</label>
                    <input
                      type="password"
                      value={wcSettings.wcCs}
                      onChange={(e) => setWcSettings({ ...wcSettings, wcCs: e.target.value })}
                      placeholder="cs_xxxxxxxxxxxx"
                      className="w-full p-2 rounded-lg border border-stone-300 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Integration Settings Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-3 bg-[#b38622] hover:bg-[#9c741c] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4" />
                {savedSuccess ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'সেটিংস সেভ করুন'}
              </button>
            </div>
          </div>
        )}

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
