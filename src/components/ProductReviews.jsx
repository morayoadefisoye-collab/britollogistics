import { useState } from 'react';
import { Star, ThumbsUp, Flag, Trash2, Edit3, CheckCircle } from 'lucide-react';
import { useReviews } from '../contexts/ReviewsContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function ProductReviews({ product }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const {
    getProductReviews,
    getProductRating,
    getRatingDistribution,
    hasUserReviewed,
    addReview,
    markHelpful,
    reportReview,
    deleteReview
  } = useReviews();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5
  });
  const [sortBy, setSortBy] = useState('newest');

  const productReviews = getProductReviews(product.id);
  const productRating = getProductRating(product.id);
  const ratingDistribution = getRatingDistribution(product.id);
  const userHasReviewed = hasUserReviewed(product.id);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      alert(t('loginToReview'));
      return;
    }

    const success = addReview(product.id, reviewForm);
    if (success) {
      setReviewForm({ rating: 5 });
      setShowReviewForm(false);
      alert(t('reviewSubmitted'));
    }
  };

  const sortedReviews = [...productReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating, size = 16, interactive = false, onRatingChange = null) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            disabled={!interactive}
          >
            <Star size={size} fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h3>{t('customerReviews')}</h3>
        {!userHasReviewed && user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn btn-primary write-review-btn"
          >
            <Edit3 size={16} />
            {t('rateProduct')}
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="overall-rating">
          <div className="rating-score">
            <span className="score">{productRating.average || 0}</span>
            {renderStars(Math.round(productRating.average))}
          </div>
          <p className="rating-count">
            {t('basedOnReviews', { count: productRating.count })}
          </p>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = ratingDistribution[rating];
            const percentage = productRating.count > 0 ? (count / productRating.count) * 100 : 0;
            
            return (
              <div key={rating} className="rating-bar">
                <span className="rating-label">{rating} {t('stars')}</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="rating-count-small">({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="review-form-container">
          <form onSubmit={handleSubmitReview} className="review-form">
            <h4>{t('rateThisProduct')}</h4>
            
            <div className="form-group">
              <label>{t('yourRating')}</label>
              <div className="rating-selector">
                {renderStars(reviewForm.rating, 32, true, (rating) => 
                  setReviewForm({ ...reviewForm, rating })
                )}
                <span className="rating-text-large">
                  {reviewForm.rating} {reviewForm.rating === 1 ? t('star') : t('stars')}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {t('submitRating')}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn btn-outline"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {productReviews.length > 0 && (
        <div className="reviews-list">
          <div className="reviews-controls">
            <div className="sort-controls">
              <label>{t('sortBy')}:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">{t('newest')}</option>
                <option value="oldest">{t('oldest')}</option>
                <option value="highest">{t('highestRated')}</option>
                <option value="lowest">{t('lowestRated')}</option>
                <option value="helpful">{t('mostHelpful')}</option>
              </select>
            </div>
          </div>

          <div className="reviews-container">
            {sortedReviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="reviewer-details">
                      <h5 className="reviewer-name">
                        {review.userName}
                        {review.verified && (
                          <CheckCircle size={14} className="verified-badge" title={t('verifiedPurchase')} />
                        )}
                      </h5>
                      <div className="review-meta">
                        {renderStars(review.rating, 14)}
                        <span className="review-date">{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {user && user.id === review.userId && (
                    <button
                      onClick={() => deleteReview(product.id, review.id)}
                      className="delete-review-btn"
                      title={t('deleteReview')}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="review-content">
                  <div className="review-rating-display">
                    {renderStars(review.rating, 16)}
                    <span className="review-rating-text">{review.rating}/5</span>
                  </div>
                </div>

                <div className="review-actions">
                  <button
                    onClick={() => markHelpful(product.id, review.id)}
                    className="helpful-btn"
                  >
                    <ThumbsUp size={14} />
                    {t('helpful')} ({review.helpful})
                  </button>
                  
                  {user && user.id !== review.userId && (
                    <button
                      onClick={() => reportReview(product.id, review.id)}
                      className="report-btn"
                      disabled={review.reported}
                    >
                      <Flag size={14} />
                      {review.reported ? t('reported') : t('report')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {productReviews.length === 0 && (
        <div className="no-reviews">
          <p>{t('noRatingsYet')}</p>
          {user && !userHasReviewed && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn btn-primary"
            >
              {t('beFirstToRate')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductReviews;