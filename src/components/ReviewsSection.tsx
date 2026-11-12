import React, { useState } from 'react';
import { Star, CheckCircle, PlusCircle, Heart, ThumbsUp, MessageCircle, Maximize2, X, ShieldCheck } from 'lucide-react';
import { PRODUCT_REVIEWS } from '../data/productData';
import { ProductReview } from '../types';

interface RealProof {
  id: string;
  name: string;
  city: string;
  highlight: string;
  quote: string;
  image: string;
  tag: string;
  time: string;
}

const REAL_CHAT_PROOFS: RealProof[] = [
  {
    id: 'proof-1',
    name: 'তাহসান খান (Tahsan Khan)',
    city: 'ধানমন্ডি, ঢাকা',
    highlight: '“ছবির চাইতে বাস্তবে আরো সুন্দর প্রোডাক্টটি”',
    quote: 'জি প্রোডাক্ট পেয়েছি। প্রোডাক্ট আমার অনেক পছন্দ হইছে। ছবির চাইতে বাস্তবে আরো সুন্দর প্রোডাক্টটি। ধন্যবাদ আপু',
    image: './assets/aistudio/44_c8a2c5fd.jpeg',
    tag: 'মেসেঞ্জার চ্যাট ও ছবি প্রুফ',
    time: 'গতকাল',
  },
  {
    id: 'proof-2',
    name: 'বাদশাহ আহমেদ',
    city: 'আগ্রাবাদ, চট্টগ্রাম',
    highlight: '“কথা কাজে এবং প্রোডাক্ট সবকিছুর মধ্যে মিল আছে”',
    quote: 'আপু আপনাকে অনেক অনেক ধন্যবাদ কথা কাজে এবং প্রোডাক্ট সবকিছুর মধ্যে মিল আছে কম্বো টা অনেক ভালো হয়েছে এবং সুন্দর লাগছে ❤️🤝🫰',
    image: './assets/aistudio/55_7fef9e9d.jpeg',
    tag: 'মেসেঞ্জার স্যাটিসফাইড কাস্টমার',
    time: '২ দিন আগে',
  },
  {
    id: 'proof-3',
    name: 'শারমিন সুলতানা (Sharmin Sultana)',
    city: 'উপশহর, সিলেট',
    highlight: '“বক্সের ভেতর গোল্ড কালার ফিনিশিং একদম নিখুঁত”',
    quote: 'আলহামদুলিল্লাহ পার্সেল হাতে পেয়েছি। বক্সের ভেতর গোল্ড কালার ফিনিশিং একদম নিখুঁত এবং অরিজিনাল সোনার মতো চকচক করছে 👍',
    image: './assets/aistudio/22_2c8861db.jpeg',
    tag: 'রিয়েল আনবক্সিং প্রমাণ',
    time: '৩ দিন আগে',
  },
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const stored = localStorage.getItem('giftmagic_user_reviews') || localStorage.getItem('jhilmill_user_reviews');
      if (stored) {
        return [...JSON.parse(stored), ...PRODUCT_REVIEWS];
      }
    } catch (e) {
      console.error(e);
    }
    return PRODUCT_REVIEWS;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [helpfulLikes, setHelpfulLikes] = useState<{ [id: string]: number }>({});

  const handleLike = (id: string) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      name: reviewerName.trim(),
      city: reviewerCity.trim() || 'বাংলাদেশ',
      rating: reviewerRating,
      date: 'আজকে',
      comment: reviewerComment.trim(),
      verified: true,
      image: './assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg',
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      const existingUser = localStorage.getItem('giftmagic_user_reviews') || localStorage.getItem('jhilmill_user_reviews');
      const userList = existingUser ? JSON.parse(existingUser) : [];
      userList.unshift(newRev);
      localStorage.setItem('giftmagic_user_reviews', JSON.stringify(userList));
    } catch (err) {
      console.error(err);
    }

    setReviewerName('');
    setReviewerCity('');
    setReviewerComment('');
    setModalOpen(false);
  };

  return (
    <section id="reviews" className="py-10 sm:py-16 bg-[#fbf9f4] border-t border-[#e8ddcc] w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ecd8] border border-[#dfceaf] text-[#8e6e28] text-xs font-semibold mb-2 font-bengali">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b38622]" />
            ১০০% বাস্তব কাস্টমার প্রতিক্রিয়া
          </div>
          <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#211c19] mt-1 font-bengali">
            সম্মানিত ক্রেতাদের বাস্তব অভিজ্ঞতা ও মতামত
          </h2>
          <p className="text-xs sm:text-sm font-bengali text-[#665749] mt-2">
            পণ্য হাতে পাওয়ার পর মেসেঞ্জারে ক্রেতাদের সরাসরি মতামত ও ডেলিভারি আনবক্সিং প্রমাণ।
          </p>
        </div>

        {/* PROMINENT SPOTLIGHT: Real Customer Messenger Feedback Showcase */}
        <div className="mb-10 font-bengali">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0084ff] text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#211c19] leading-tight">
                  মেসেঞ্জারে ক্রেতাদের সরাসরি চ্যাট ও আনবক্সিং ফটো
                </h3>
                <span className="text-[11px] text-[#736353]">
                  স্ক্রিনশটে ক্লিক করে বড় করে দেখে নিতে পারেন
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REAL_CHAT_PROOFS.map((proof) => (
              <div
                key={proof.id}
                className="bg-white rounded-2xl border-2 border-[#dfceaf] hover:border-[#b38622] transition-all shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between group"
              >
                {/* Header of proof card */}
                <div className="p-4 pb-3 border-b border-[#f3ebde] bg-[#fdfcf9]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e7f3ff] text-[#0066cc] border border-[#badcfe]">
                      <MessageCircle className="w-2.5 h-2.5 fill-current" />
                      {proof.tag}
                    </span>
                    <span className="text-[10px] text-stone-400">{proof.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#211c19] leading-tight">
                        {proof.name}
                      </h4>
                      <p className="text-[11px] text-[#736353]">{proof.city}</p>
                    </div>
                    <div className="flex text-[#d4af37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Highlight Quote */}
                <div className="p-4 pt-3 flex-1 flex flex-col justify-between">
                  <div className="mb-3">
                    <div className="p-2.5 rounded-xl bg-[#faf5ec] border border-[#f0e4cf] text-[#855d14] font-bold text-xs leading-snug mb-2">
                      {proof.highlight}
                    </div>
                    <p className="text-xs text-[#44382e] leading-relaxed italic bg-[#fcfbfa] p-2 rounded-lg border border-[#f6f1e9]">
                      "{proof.quote}"
                    </p>
                  </div>

                  {/* Screenshot Thumbnail with Click to Zoom */}
                  <div
                    onClick={() =>
                      setPreviewImage({
                        url: proof.image,
                        title: proof.name,
                        subtitle: `${proof.city} · ${proof.tag}`,
                      })
                    }
                    className="relative rounded-xl overflow-hidden border border-[#d8ccba] cursor-pointer group/img aspect-16/11 bg-[#1a1a1a] flex items-center justify-center"
                  >
                    <img
                      src={proof.image}
                      alt={proof.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300 opacity-95 group-hover/img:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md group-hover/img:scale-105 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-[#f5d77f]" />
                        ক্লিক করে বড় করে দেখুন
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aggregate Ratings Overview */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#e8dfcf] shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-full overflow-hidden">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#211c19]">
                4.9
              </span>
              <span className="text-stone-400 text-lg">/ ৫.০</span>
            </div>
            <div className="flex items-center gap-1 text-[#d4af37] text-lg mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-[#d4af37]" />
              ))}
            </div>
            <p className="text-xs font-bengali text-[#736353] mt-1.5">
              ১৮৭+ ভেরিফায়েড ক্রেতাদের থেকে সর্বসম্মত ৫-স্টার অভিজ্ঞতা
            </p>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 max-w-md w-full space-y-1.5 font-bengali text-xs text-[#524436]">
            <div className="flex items-center gap-2">
              <span className="w-12">৫ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-[#f0e7d8] overflow-hidden">
                <div className="h-full bg-[#c99f36] w-[96%]" />
              </div>
              <span className="w-8 text-right font-mono font-bold">96%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12">৪ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-[#f0e7d8] overflow-hidden">
                <div className="h-full bg-[#c99f36] w-[4%]" />
              </div>
              <span className="w-8 text-right font-mono font-bold">4%</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <span className="w-12">৩-১ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-[#f0e7d8] overflow-hidden">
                <div className="h-full bg-stone-300 w-[0%]" />
              </div>
              <span className="w-8 text-right font-mono font-bold">0%</span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-[#b38622] bg-[#faf5eb] hover:bg-[#f3ead6] text-[#916e1e] font-bengali font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              আপনার রিভিউ লিখুন
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-bengali">
          {reviews.map((rev) => {
            const likes = helpfulLikes[rev.id] || 0;
            return (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-[#ede3d3] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <h4 className="font-bold text-sm text-[#211c19] flex items-center gap-1.5 flex-wrap">
                        <span>{rev.name}</span>
                        {rev.badgeText ? (
                          <span className="text-[10px] text-[#0066cc] bg-[#eef6ff] px-1.5 py-0.2 rounded font-normal border border-[#d6e9ff]">
                            {rev.badgeText}
                          </span>
                        ) : rev.verified ? (
                          <span className="text-[10px] text-[#2d7a46] flex items-center gap-0.5 bg-[#eef7f0] px-1.5 py-0.2 rounded font-normal">
                            <CheckCircle className="w-3 h-3" /> ভেরিফায়েড ক্রেতা
                          </span>
                        ) : null}
                      </h4>
                      <p className="text-[11px] text-[#78695b]">{rev.city} · {rev.date}</p>
                    </div>
                    <div className="flex items-center text-[#d4af37] text-xs">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4d4033] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {rev.image && (
                  <div className="mt-4 pt-3 border-t border-[#f2eae0] flex items-center justify-between">
                    <div
                      onClick={() =>
                        setPreviewImage({
                          url: rev.image!,
                          title: rev.name,
                          subtitle: `${rev.city} · ${rev.date}`,
                        })
                      }
                      className="flex items-center gap-2 cursor-pointer group/thumb"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#e0d6c4] bg-stone-100 group-hover/thumb:border-[#b38622] transition-colors">
                        <img
                          src={rev.image}
                          alt="Customer review photo"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-stone-500 group-hover/thumb:text-[#b38622] flex items-center gap-1">
                        <Maximize2 className="w-2.5 h-2.5" />
                        বড় করে দেখুন
                      </span>
                    </div>

                    <button
                      onClick={() => handleLike(rev.id)}
                      className="text-[11px] text-[#736353] hover:text-[#9e2a2b] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>উপকারী ({likes})</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Screenshot / Photo Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative bg-[#1c1917] rounded-2xl max-w-lg w-full overflow-hidden border border-stone-700 shadow-2xl font-bengali flex flex-col max-h-[92vh] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3 sm:p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-white">
              <div>
                <h4 className="font-bold text-sm text-[#f5d77f]">
                  {previewImage.title}
                </h4>
                {previewImage.subtitle && (
                  <p className="text-xs text-stone-400">{previewImage.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Viewer */}
            <div className="p-2 sm:p-4 flex-1 overflow-auto flex items-center justify-center bg-black">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-md"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-stone-900 border-t border-stone-800 text-center">
              <span className="text-xs text-stone-300 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f5d77f]" />
                গিফট ম্যাজিক কাস্টমার ভেরিফায়েড প্রমাণ
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#d8ccba] shadow-xl font-bengali space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#ece2d3] pb-3">
              <h3 className="font-bold text-base text-[#211c19] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#9e2a2b]" />
                আপনার মূল্যবান রিভিউ দিন
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-black cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#382f26] mb-1">
                  আপনার নাম <span className="text-[#a82527]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="উদা: ফারহানা আফরিন"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#d8ccba] focus:outline-none focus:ring-1 focus:ring-[#b38622]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382f26] mb-1">
                  শহর / এলাকা
                </label>
                <input
                  type="text"
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  placeholder="উদা: ধানমন্ডি, ঢাকা"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#d8ccba] focus:outline-none focus:ring-1 focus:ring-[#b38622]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382f26] mb-1">
                  রেটিং
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="cursor-pointer text-xl"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewerRating
                            ? 'text-[#d4af37] fill-current'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#b38622]">
                    {reviewerRating} স্টার
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382f26] mb-1">
                  আপনার মতামত <span className="text-[#a82527]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  placeholder="পায়েলটির ফিনিশিং, কোয়ালিটি এবং ডেলিভারি অভিজ্ঞতা কেমন ছিল লিখুন..."
                  className="w-full p-2.5 text-xs rounded-lg border border-[#d8ccba] focus:outline-none focus:ring-1 focus:ring-[#b38622]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs rounded-lg border border-[#d8ccba] hover:bg-stone-50 text-stone-700 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs rounded-lg bg-[#b38622] hover:bg-[#996f18] text-white font-semibold cursor-pointer shadow-xs"
                >
                  সাবমিট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
