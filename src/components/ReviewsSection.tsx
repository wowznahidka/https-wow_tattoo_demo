import React, { useState } from 'react';
import { Language, Review } from '../types';
import { REVIEWS } from '../data/mockData';
import { 
  Star, 
  CheckCircle2, 
  PlusCircle, 
  X 
} from 'lucide-react';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New review form
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [artistName, setArtistName] = useState('Олексій "Obsidian"');
  const [comment, setComment] = useState('');
  const [tattooTitle, setTattooTitle] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      rating,
      date: lang === 'uk' ? 'Сьогодні' : 'Today',
      artistName,
      tattooTitle: { uk: tattooTitle || 'Авторське тату', en: tattooTitle || 'Custom Tattoo' },
      comment: { uk: comment, en: comment },
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddModal(false);
    setAuthor('');
    setComment('');
    setTattooTitle('');
  };

  return (
    <section id="reviews" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-red-600"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
              {lang === 'uk' ? 'Реальні враження' : 'Client Testimonials'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
            {lang === 'uk' ? 'Відгуки наших клієнтів' : 'Client Stories & Reviews'}
          </h2>
          <div className="flex items-center space-x-3 text-sm text-zinc-400">
            <div className="flex text-red-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
              ))}
            </div>
            <span className="font-bold text-white font-mono text-xs tracking-wider">4.98 / 5.0</span>
            <span className="text-zinc-400 text-xs font-mono">
              ({lang === 'uk' ? 'понад 420 підтверджених відгуків' : '420+ verified reviews'})
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3.5 bg-red-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center space-x-2 cursor-pointer self-start md:self-auto font-mono shadow-md border border-red-500/50"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>{lang === 'uk' ? 'Залишити відгук' : 'Write a Review'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#121216] border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-red-500/40 transition-colors shadow-xl"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover border border-white/15"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center">
                      {rev.author}
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 ml-1.5 inline" />
                      )}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{rev.date}</span>
                  </div>
                </div>

                <div className="flex text-red-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-red-500 text-red-500" />
                  ))}
                </div>
              </div>

              {/* Tattoo & Master tag */}
              <div className="text-[11px] text-red-400 font-mono tracking-wide">
                {lang === 'uk' ? rev.tattooTitle.uk : rev.tattooTitle.en} • {rev.artistName}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed italic font-sans">
                "{lang === 'uk' ? rev.comment.uk : rev.comment.en}"
              </p>
            </div>

            {rev.photoUrl && (
              <div className="pt-2">
                <img
                  src={rev.photoUrl}
                  alt="Review photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-36 object-cover border border-white/10 filter contrast-110"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-white/20 text-white max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl font-bold text-white">
              {lang === 'uk' ? 'Поділіться вашим враженням' : 'Leave Your Feedback'}
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-[10px] text-zinc-300 uppercase font-mono tracking-widest block mb-1">
                  {lang === 'uk' ? 'Ваше ім’я:' : 'Your Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#181820] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-zinc-300 uppercase font-mono tracking-widest block mb-1">
                    {lang === 'uk' ? 'Майстер:' : 'Master Artist:'}
                  </label>
                  <select
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="w-full bg-[#181820] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  >
                    <option>Олексій "Obsidian"</option>
                    <option>Марія "Vesper"</option>
                    <option>Ярослав "Kitsune"</option>
                    <option>Діана "Cybersigil"</option>
                    <option>Богдан "Vanguard"</option>
                    <option>Аліна "Aura"</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-300 uppercase font-mono tracking-widest block mb-1">
                    {lang === 'uk' ? 'Оцінка:' : 'Rating:'}
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#181820] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-300 uppercase font-mono tracking-widest block mb-1">
                  {lang === 'uk' ? 'Назва або стиль тату:' : 'Tattoo Title / Style:'}
                </label>
                <input
                  type="text"
                  value={tattooTitle}
                  onChange={(e) => setTattooTitle(e.target.value)}
                  placeholder={lang === 'uk' ? 'Наприклад: Блекворк рукав' : 'E.g., Blackwork sleeve'}
                  className="w-full bg-[#181820] border border-white/15 p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-300 uppercase font-mono tracking-widest block mb-1">
                  {lang === 'uk' ? 'Ваш відгук:' : 'Your Review:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#181820] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer font-mono shadow-md border border-red-500/50"
              >
                {lang === 'uk' ? 'Опублікувати відгук' : 'Publish Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
