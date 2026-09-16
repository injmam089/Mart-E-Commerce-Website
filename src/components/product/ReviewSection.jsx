import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Star, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import Rating from '../common/Rating';
import { getProductReviews } from '../../services/productService';
import { cn } from '../../utils/helpers';

// ReviewSection - Displays product reviews and review form
const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Fallback to empty array if service fails
        const data = await getProductReviews(productId).catch(() => []);
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!title.trim() || !comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate API call
    const newReview = {
      id: `rev-${Date.now()}`,
      productId,
      userName: 'Current User', // Mock user
      userAvatar: `https://picsum.photos/seed/${Date.now()}/100/100`,
      rating,
      title,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
      verified: true
    };

    setReviews([newReview, ...reviews]);
    toast.success('Review submitted successfully!');
    setShowForm(false);
    
    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
  };

  const calculateDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (!reviews.length) return dist;
    
    reviews.forEach(r => {
      if (dist[r.rating] !== undefined) {
        dist[r.rating]++;
      }
    });
    
    // Convert to percentages
    Object.keys(dist).forEach(key => {
      dist[key] = (dist[key] / reviews.length) * 100;
    });
    
    return dist;
  };

  const avgRating = reviews.length 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const distribution = calculateDistribution();

  return (
    <div className="py-10 border-t border-gray-200 dark:border-dark-700">
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        {/* Summary Section */}
        <div className="w-full md:w-1/3 flex flex-col">
          <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Customer Reviews</h3>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl font-extrabold text-dark-900 dark:text-white">
              {avgRating}
            </div>
            <div className="flex flex-col">
              <Rating rating={parseFloat(avgRating)} size="lg" />
              <span className="text-sm text-dark-500 mt-1">Based on {reviews.length} reviews</span>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-medium text-dark-600 dark:text-dark-300 w-12 flex items-center gap-1">
                  {star} <Star size={12} className="fill-current" />
                </span>
                <div className="flex-grow h-2.5 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${distribution[star] || 0}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-secondary-500 rounded-full"
                  />
                </div>
                <span className="text-xs text-dark-500 w-10 text-right">
                  {Math.round(distribution[star] || 0)}%
                </span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn btn-outline w-full"
          >
            <MessageSquare size={18} className="mr-2" />
            {showForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Reviews List & Form Section */}
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card p-6 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700"
              >
                <h4 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Write Your Review</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Overall Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            size={28} 
                            className={cn(
                              "transition-colors",
                              (hoverRating || rating) >= star 
                                ? "fill-secondary-500 text-secondary-500" 
                                : "text-gray-300 dark:text-dark-600"
                            )} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Review Title
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Summarize your experience"
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Your Review
                    </label>
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you like or dislike?"
                      rows="4"
                      className="input-base resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="py-10 text-center">
                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-dark-500">Loading reviews...</p>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700">
                    <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-dark-600 mb-4" />
                    <p className="text-dark-600 dark:text-dark-400 font-medium">No reviews yet.</p>
                    <p className="text-sm text-dark-500 mb-4">Be the first to share your experience!</p>
                    <button onClick={() => setShowForm(true)} className="btn btn-sm btn-outline">
                      Write a Review
                    </button>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 dark:border-dark-700 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName} 
                            className="w-10 h-10 rounded-full object-cover bg-gray-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-semibold text-dark-900 dark:text-white text-sm">
                                {review.userName}
                              </h5>
                              {review.verified && (
                                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                                  Verified
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-dark-400">
                              {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <Rating rating={review.rating} size="sm" />
                      </div>
                      
                      <h6 className="font-bold text-dark-900 dark:text-white mb-2">{review.title}</h6>
                      <p className="text-dark-600 dark:text-dark-300 text-sm mb-4 leading-relaxed">
                        {review.comment}
                      </p>
                      
                      <button className="flex items-center gap-1.5 text-xs font-medium text-dark-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <ThumbsUp size={14} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
