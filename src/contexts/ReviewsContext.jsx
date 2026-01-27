import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ReviewsContext = createContext();

// Custom hook for using reviews context
export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('productReviews');
    return saved ? JSON.parse(saved) : {};
  });

  // Save reviews when they change
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId, reviewData) => {
    if (!user) return false;

    const newReview = {
      id: Date.now(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      rating: reviewData.rating,
      date: new Date().toISOString(),
      verified: true, // In real app, this would be based on purchase history
      helpful: 0,
      reported: false
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));

    return true;
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getProductRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return { average: 0, count: 0 };

    const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / productReviews.length;

    return {
      average: Math.round(average * 10) / 10,
      count: productReviews.length
    };
  };

  const getRatingDistribution = (productId) => {
    const productReviews = reviews[productId] || [];
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    productReviews.forEach(review => {
      distribution[review.rating]++;
    });

    return distribution;
  };

  const hasUserReviewed = (productId) => {
    if (!user) return false;
    const productReviews = reviews[productId] || [];
    return productReviews.some(review => review.userId === user.id);
  };

  const markHelpful = (productId, reviewId) => {
    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId]?.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      ) || []
    }));
  };

  const reportReview = (productId, reviewId) => {
    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId]?.map(review =>
        review.id === reviewId
          ? { ...review, reported: true }
          : review
      ) || []
    }));
  };

  const deleteReview = (productId, reviewId) => {
    if (!user) return false;

    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId]?.filter(review => 
        !(review.id === reviewId && review.userId === user.id)
      ) || []
    }));

    return true;
  };

  const value = {
    reviews,
    addReview,
    getProductReviews,
    getProductRating,
    getRatingDistribution,
    hasUserReviewed,
    markHelpful,
    reportReview,
    deleteReview
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};