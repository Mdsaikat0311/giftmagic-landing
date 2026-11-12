import React, { useState } from 'react';
import {
  Lock,
  Sparkles,
  Truck,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Check,
  MessageCircle,
} from 'lucide-react';
import { ProductPackage, CustomerOrder } from '../types';
import { PRODUCT_PACKAGES } from '../data/productData';
import { submitOrderToWooCommerce } from '../services/wooCommerceService';
import { trackPurchase, trackInitiateCheckout } from '../utils/tracking';

interface OrderFormSectionProps {
  selectedPackage: ProductPackage;
  onSelectPackage: (pkg: ProductPackage) => void;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  selectedPackage,
  onSelectPackage,
  quantity,
  onQuantityChange,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [includeKidsPayel, setIncludeKidsPayel] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const KIDS_PAYEL_PRICE = 499;
  const kidsAddonPrice = includeKidsPayel ? KIDS_PAYEL_PRICE : 0;
  const deliveryFee = deliveryArea === 'inside_dhaka' ? 70 : 110;
  const packageTotal = selectedPackage.salePrice * quantity;
  const subtotal = packageTotal + kidsAddonPrice;
  const total = subtotal + deliveryFee;

  const whatsappOrderText = encodeURIComponent(
    `আসসালামু আলাইকুম! আমি গিফট ম্যাজিক থেকে "${selectedPackage.bengaliName}" (${quantity} জোড়া${
      includeKidsPayel ? ' + বাচ্চা মেয়েদের ১ জোড়া পায়েল' : ''
    }, মোট ৳${total}) সম্পর্কে বিস্তারিত জেনে অর্ডার করতে / অগ্রিম পেমেন্ট করতে চাই।` +
      (customerName.trim() ? `\nনাম: ${customerName.trim()}` : '') +
      (phone.trim() ? `\nফোন: ${phone.trim()}` : '') +
      (address.trim() ? `\nঠিকানা: ${address.trim()}` : '')
  );
  const whatsappCheckoutUrl = `https://wa.me/8801700000000?text=${whatsappOrderText}`;


  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) {
      errs.customerName = 'অনুগ্রহ করে আপনার পুরো নামটি লিখুন';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      errs.phone = 'আপনার ১১ ডিজিটের মোবাইল নম্বরটি লিখুন';
    } else if (cleanPhone.length < 11) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (উদা: 017XXXXXXXX)';
    }
    if (!address.trim()) {
      errs.address = 'আপনার সম্পূর্ণ ঠিকানা (বাসা/রোড, থানা, জেলা) লিখুন';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const generatedId = `JS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CustomerOrder = {
      id: generatedId,
      createdAt: new Date().toLocaleString('bn-BD', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      deliveryArea,
      deliveryFee,
      packageId: selectedPackage.id,
      packageName: selectedPackage.bengaliName,
      quantity,
      unitPrice: selectedPackage.salePrice,
      subtotal,
      total,
      includeKidsPayel,
      kidsPayelPrice: kidsAddonPrice,
      status: 'Pending',
      paymentMethod: 'Cash on Delivery',
    };

    // 1. Sync with WooCommerce (Native WordPress Bridge or REST API)
    try {
      const syncResult = await submitOrderToWooCommerce(newOrder);
      if (syncResult && syncResult.wcOrderId) {
        newOrder.wcOrderId = syncResult.wcOrderId;
        newOrder.id = `#${syncResult.wcOrderId}`;
      }
    } catch (err) {
      console.warn('WooCommerce sync warning (fallback local save active)', err);
    }

    // 2. Fire Meta Pixel (Purchase + Lead), GA4, TikTok, GTM DataLayer
    try {
      trackPurchase(newOrder);
    } catch (err) {
      console.warn('Pixel tracking error', err);
    }

    // 3. Save to localStorage history
    try {
      const stored = localStorage.getItem('giftmagic_orders') || localStorage.getItem('jhilmill_orders');
      const orders: CustomerOrder[] = stored ? JSON.parse(stored) : [];
      orders.unshift(newOrder);
      localStorage.setItem('giftmagic_orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  return (
    <section id="order-form" className="py-10 sm:py-16 bg-[#f7f3ea] border-t-2 border-[#d8be8d] w-full max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#9e2a2b] font-bold">
            Cash On Delivery Checkout
          </span>
          <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#211c19] mt-1 font-bengali">
            অর্ডার করতে নিচের ফর্মটি সঠিক তথ্য দিয়ে পূরণ করুন
          </h2>
          <p className="text-xs sm:text-sm font-bengali text-[#665749] mt-1">
            কোনো অগ্রিম পেমেন্ট করতে হবে না · ডেলিভারির সময় দেখে মূল্য পরিশোধ করুন
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-[#d8be8d] shadow-md p-4 sm:p-8 space-y-6 font-bengali w-full max-w-full overflow-hidden"
        >
          {/* STEP 1: Select Package & Add Quantity (All in Order Section, exactly as requested!) */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-[#ebdcc7]">
              <h3 className="font-bold text-sm sm:text-base text-[#211c19] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9e7626]" />
                ১. আপনার পছন্দের প্যাকেজ নির্বাচন করুন:
              </h3>
              <span className="text-xs text-[#94784a] font-medium">
                (পছন্দের প্যাকেজে টিক দিন)
              </span>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {PRODUCT_PACKAGES.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className={`relative p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#b38622] bg-[#fefdf9] shadow-xs ring-1 ring-[#b38622]'
                        : 'border-[#e8dfcf] bg-white hover:border-[#cfbe9e] hover:bg-[#faf7f0]'
                    }`}
                  >
                    {/* Badge */}
                    {pkg.badge && (
                      <span
                        className={`absolute -top-2.5 right-3 text-[10px] font-bengali font-bold px-2.5 py-0.5 rounded shadow-2xs ${
                          pkg.isPopular
                            ? 'bg-linear-to-r from-[#9e2a2b] to-[#b83335] text-white'
                            : 'bg-[#b38622] text-white'
                        }`}
                      >
                        ★ {pkg.badge}
                      </span>
                    )}

                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                          isSelected ? 'border-[#b38622] bg-[#b38622]' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="font-bengali font-bold text-sm text-[#26201a]">
                          {pkg.bengaliName}
                        </div>
                        <div className="text-xs font-bengali text-[#736353]">
                          {pkg.description}
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 ml-8 sm:ml-0 flex items-baseline sm:flex-col gap-2 sm:gap-0">
                      <span className="font-serif-luxury text-lg font-bold text-[#9e2a2b] tabular-nums">
                        ৳{pkg.salePrice}
                      </span>
                      <span className="text-xs text-stone-400 line-through tabular-nums">
                        ৳{pkg.regularPrice}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Stepper (Added right here in the Order Section!) */}
            <div className="flex items-center justify-between p-3.5 bg-[#fbf8f2] rounded-xl border border-[#ede3d3] mt-3">
              <div>
                <span className="font-bengali font-bold text-xs sm:text-sm text-[#382f26]">
                  পরিমাণ (Quantity):
                </span>
                <span className="block text-[11px] text-stone-500">
                  কয়টি প্যাকেজ নিতে চান সংখ্যা নির্ধারণ করুন
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-lg bg-white border border-[#d8ccba] hover:bg-[#f0e7d8] text-[#211c19] font-bold flex items-center justify-center transition-colors cursor-pointer text-base shadow-2xs"
                >
                  -
                </button>
                <span className="font-mono font-bold text-base text-[#211c19] tabular-nums w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-lg bg-white border border-[#d8ccba] hover:bg-[#f0e7d8] text-[#211c19] font-bold flex items-center justify-center transition-colors cursor-pointer text-base shadow-2xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Extra Selectable Option / Add-on: বাচ্চা মেয়েদের একজোড়া পায়েল */}
            <div className="pt-2">
              <div
                onClick={() => setIncludeKidsPayel(!includeKidsPayel)}
                className={`relative p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  includeKidsPayel
                    ? 'border-[#b38622] bg-[#fffcf5] ring-2 ring-[#b38622]/30 shadow-xs'
                    : 'border-[#dfd3bf] bg-[#faf8f4] hover:border-[#b38622]/60 hover:bg-white'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                      includeKidsPayel
                        ? 'border-[#b38622] bg-[#b38622] text-white'
                        : 'border-stone-400 bg-white'
                    }`}
                  >
                    {includeKidsPayel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bengali font-bold text-sm text-[#26201a]">
                        বাচ্চা মেয়েদের ১ জোড়া পায়েল (কিডস সাইজ)
                      </span>
                      <span className="text-[10px] font-bold bg-[#9e2a2b] text-white px-2 py-0.5 rounded shadow-2xs">
                        ঐচ্ছিক অ্যাড-অন
                      </span>
                    </div>
                    <div className="text-xs font-bengali text-[#736353] mt-0.5">
                      চাইলে বড়দেরটার পাশাপাশি বাচ্চাদের ম্যাচিং পায়েলও একসাথে নিতে এখানে টিক দিন
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 ml-8 sm:ml-0 flex items-baseline sm:flex-col gap-2 sm:gap-0">
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#9e2a2b] tabular-nums">
                    +৳৪৯৯
                  </span>
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    ৳৭৯৯
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Customer Name, Phone, and Address (Right below Package selection) */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-sm sm:text-base text-[#211c19] pb-2 border-b border-[#ebdcc7] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#9e7626]" />
              ২. আপনার নাম ও ডেলিভারি তথ্য:
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#382f26]">
                আপনার পুরো নাম <span className="text-[#a82527]">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="উদাহরণ: তাসমিয়া জাহান"
                className={`w-full p-3 text-sm rounded-xl border bg-[#fdfcf9] focus:outline-none focus:ring-2 focus:ring-[#b38622] transition-colors ${
                  errors.customerName ? 'border-[#d33a3a] bg-red-50/30' : 'border-[#d8ccba]'
                }`}
              />
              {errors.customerName && (
                <p className="text-xs text-[#a82527] font-medium">{errors.customerName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#382f26]">
                মোবাইল নম্বর <span className="text-[#a82527]">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="উদাহরণ: 017XXXXXXXX"
                className={`w-full p-3 text-sm rounded-xl border bg-[#fdfcf9] focus:outline-none focus:ring-2 focus:ring-[#b38622] transition-colors ${
                  errors.phone ? 'border-[#d33a3a] bg-red-50/30' : 'border-[#d8ccba]'
                }`}
              />
              {errors.phone && <p className="text-xs text-[#a82527] font-medium">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#382f26]">
                সম্পূর্ণ ঠিকানা (বাসা/রোড নং, এলাকা, থানা, জেলা){' '}
                <span className="text-[#a82527]">*</span>
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="উদাহরণ: বাসা ১২, রোড ৫, ব্লক বি, মিরপুর-১০, ঢাকা"
                className={`w-full p-3 text-sm rounded-xl border bg-[#fdfcf9] focus:outline-none focus:ring-2 focus:ring-[#b38622] transition-colors ${
                  errors.address ? 'border-[#d33a3a] bg-red-50/30' : 'border-[#d8ccba]'
                }`}
              />
              {errors.address && (
                <p className="text-xs text-[#a82527] font-medium">{errors.address}</p>
              )}
            </div>
          </div>

          {/* STEP 3: Delivery Area Selector */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm sm:text-base text-[#211c19] pb-2 border-b border-[#ebdcc7] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#9e7626]" />
              ৩. আপনার ডেলিভারি এলাকা নির্বাচন করুন:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryArea('inside_dhaka')}
                className={`p-3 sm:p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  deliveryArea === 'inside_dhaka'
                    ? 'border-[#b38622] bg-[#fbf6ec] shadow-xs'
                    : 'border-[#e0d6c4] bg-[#fdfcf9] hover:bg-[#f8f5ee]'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      deliveryArea === 'inside_dhaka'
                        ? 'border-[#b38622] bg-[#b38622]'
                        : 'border-stone-400'
                    }`}
                  >
                    {deliveryArea === 'inside_dhaka' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#26201a]">ঢাকার ভেতরে (Inside Dhaka)</div>
                    <div className="text-[11px] text-stone-500">২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-[#9e2a2b] shrink-0">৳৭০</span>
              </label>

              <label
                onClick={() => setDeliveryArea('outside_dhaka')}
                className={`p-3 sm:p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  deliveryArea === 'outside_dhaka'
                    ? 'border-[#b38622] bg-[#fbf6ec] shadow-xs'
                    : 'border-[#e0d6c4] bg-[#fdfcf9] hover:bg-[#f8f5ee]'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      deliveryArea === 'outside_dhaka'
                        ? 'border-[#b38622] bg-[#b38622]'
                        : 'border-stone-400'
                    }`}
                  >
                    {deliveryArea === 'outside_dhaka' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#26201a]">
                      ঢাকার বাইরে (Outside Dhaka)
                    </div>
                    <div className="text-[11px] text-stone-500">২-৩ কার্যদিবসে হোম ডেলিভারি</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-[#9e2a2b] shrink-0">৳১১০</span>
              </label>
            </div>
          </div>

          {/* STEP 4: Order Summary & Bill Calculation */}
          <div className="pt-2">
            <h3 className="font-bold text-sm sm:text-base text-[#211c19] pb-2 border-b border-[#ebdcc7] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9e7626]" />
              ৪. অর্ডার সামারি ও চূড়ান্ত বিল:
            </h3>

            <div className="p-3.5 sm:p-4 bg-[#fbf8f2] rounded-xl border border-[#e8dfcf] space-y-3 mt-3">
              {/* Item Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[#211c19]">{selectedPackage.bengaliName}</span>
                  <span className="text-stone-500 text-xs">({quantity} টি)</span>
                </div>
                <span className="font-mono font-bold text-[#211c19] tabular-nums">৳{packageTotal}</span>
              </div>

              {/* Kids Payel Add-on if selected */}
              {includeKidsPayel && (
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#382f26] bg-[#f7f2e7] px-2.5 py-1.5 rounded-lg border border-[#e8dac5]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#9e7626]" />
                    <span>বাচ্চা মেয়েদের ১ জোড়া পায়েল (অ্যাড-অন):</span>
                  </span>
                  <span className="font-mono font-bold text-[#9e2a2b] tabular-nums">+৳{kidsAddonPrice}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs sm:text-sm text-[#665749]">
                <span>ডেলিভারি চার্জ ({deliveryArea === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'}):</span>
                <span className="font-mono font-bold text-[#211c19] tabular-nums">৳{deliveryFee}</span>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-[#e2d5c2] flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm sm:text-base text-[#211c19]">সর্বমোট প্রদেয় টাকা:</span>
                  <span className="block text-[11px] text-[#705e4d]">
                    (পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে দিন)
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#9e2a2b] tabular-nums">
                    ৳{total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Assurance */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#eef7f0] border border-[#c4e3cb] flex items-center gap-2.5 sm:gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2d7a46] shrink-0" />
            <div className="text-xs text-[#20522f]">
              <span className="font-bold">ক্যাশ অন ডেলিভারি (Cash On Delivery):</span> কোনো অগ্রিম টাকা
              ছাড়া নিরাপদে পণ্য রিসিভ করে তারপর মূল্য পরিশোধ করুন।
            </div>
          </div>

          {/* Big High-Converting Submit Button */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-lg text-white bg-linear-to-r from-[#a37920] via-[#c99f36] to-[#a37920] hover:brightness-105 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 shrink-0" />
              <span className="truncate">
                {isSubmitting
                  ? 'অর্ডার প্রসেস হচ্ছে...'
                  : `অর্ডার কনফার্ম করতে ক্লিক করুন (৳${total})`}
              </span>
            </button>

            {/* Dedicated WhatsApp Option */}
            <div className="pt-1 space-y-2">
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl border-2 border-[#25d366] bg-[#f0fbf4] hover:bg-[#e4f8ec] text-[#1b7038] transition-all shadow-xs flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left font-bengali">
                  <span className="block font-bold text-sm sm:text-base text-[#155724] leading-tight">
                    হোয়াটসঅ্যাপে যোগাযোগ করে অর্ডার করুন
                  </span>
                  <span className="block text-[11px] sm:text-xs text-[#2b7244]">
                    সরাসরি কথা বলতে বা বিকাশ/নগদে অগ্রিম পেমেন্ট করতে ক্লিক করুন
                  </span>
                </div>
              </a>

              <p className="text-xs sm:text-[13px] text-[#2c5237] text-center px-3.5 py-2.5 rounded-xl bg-[#eaf7ee] border border-[#c4e6ce] font-bengali leading-relaxed">
                আপনি অগ্রিম পেমেন্ট করতে চাইলে বা বিস্তারিত কথা বলে অর্ডার করতে চাইলে আমাদের হোয়াটসঅ্যাপে নক দিন।
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#705e4d] text-center pt-1">
              <ShieldCheck className="w-4 h-4 text-[#2d7a46] shrink-0" />
              <span>
                অর্ডার নিশ্চিত করার পর আমাদের কাস্টমার রিলেশন প্রতিনিধি আপনাকে কল করে ডেলিভারি সময় জানিয়ে দেবেন।
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
