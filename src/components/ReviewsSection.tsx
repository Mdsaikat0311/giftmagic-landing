import React, { useState } from 'react';
import { Star, CheckCircle, PlusCircle, Heart, ThumbsUp } from 'lucide-react';
import { PRODUCT_REVIEWS } from '../data/productData';
import { ProductReview } from '../types';

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
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#94784a] font-bold">
            Customer Testimonials & Experiences
          </span>
          <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#211c19] mt-1.5 font-bengali">
            সম্মানিত ক্রেতাদের বাস্তব অভিজ্ঞতা ও মতামত
          </h2>
          <p className="text-xs sm:text-sm font-bengali text-[#665749] mt-2">
            শত শত প্রিয়জনদের কাছে ভালোবাসা পৌঁছে দেওয়ার চমৎকার অভিজ্ঞতা আমাদের অনুপ্রেরণা।
          </p>
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
              ১৮৪+ ভেরিফায়েড ক্রেতাদের থেকে সর্বসম্মত ৫-স্টার অভিজ্ঞতা
            </p>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 max-w-md w-full space-y-1.5 font-bengali text-xs text-[#524436]">
            <div className="flex items-center gap-2">
              <span className="w-12">৫ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-[#f0e7d8] overflow-hidden">
                <div className="h-full bg-[#c99f36] w-[95%]" />
              </div>
              <span className="w-8 text-right font-mono font-bold">95%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12">৪ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-[#f0e7d8] overflow-hidden">
                <div className="h-full bg-[#c99f36] w-[5%]" />
              </div>
              <span className="w-8 text-right font-mono font-bold">5%</span>
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
                      <h4 className="font-bold text-sm text-[#211c19] flex items-center gap-1.5">
                        {rev.name}
                        {rev.verified && (
                          <span className="text-[10px] text-[#2d7a46] flex items-center gap-0.5 bg-[#eef7f0] px-1.5 py-0.2 rounded font-normal">
                            <CheckCircle className="w-3 h-3" /> ভেরিফায়েড ক্রেতা
                          </span>
                        )}
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
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#e0d6c4]">
                        <img
                          src={rev.image}
                          alt="Customer review photo"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] text-stone-500">গ্রাহকের রিয়েল ছবি</span>
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
