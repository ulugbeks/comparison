import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Mail, Phone, Globe, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ReviewForm from '../components/reviews/ReviewForm';

interface Shop {
  id: string;
  name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  logo_url: string;
  website_url: string;
  telegram_url: string;
  created_at: string;
}

interface ShopReview {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
}

const ShopProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { shopId } = useParams<{ shopId: string }>();
  const { user } = useAuth();
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<ShopReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchShopData = async () => {
    try {
      if (!shopId) return;

      const { data: shopData, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('id', shopId)
        .single();

      if (shopError) throw shopError;
      setShop(shopData);

      const { data: reviewsData, error: reviewsError } = await supabase
        .from('shop_reviews')
        .select('id, rating, comment, created_at, user_name')
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, [shopId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop Not Found</h2>
          <p className="text-gray-600">The shop you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              {shop.logo_url ? (
                <img
                  src={shop.logo_url}
                  alt={shop.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <Globe size={32} className="text-gray-400" />
              )}
            </div>

            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h1>
              
              <div className="flex items-center mb-2">
                <div className="flex text-warning-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(averageRating) ? 'currentColor' : 'none'}
                      className={i < Math.floor(averageRating) ? '' : 'opacity-50'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>

              <p className="text-gray-600 mb-4">{shop.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shop.address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <span>{shop.address}</span>
                  </div>
                )}
                {shop.contact_email && (
                  <div className="flex items-center text-gray-600">
                    <Mail size={18} className="mr-2" />
                    <a href={`mailto:${shop.contact_email}`} className="hover:text-primary-500">
                      {shop.contact_email}
                    </a>
                  </div>
                )}
                {shop.contact_phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone size={18} className="mr-2" />
                    <a href={`tel:${shop.contact_phone}`} className="hover:text-primary-500">
                      {shop.contact_phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>Member since {new Date(shop.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4 flex flex-wrap gap-4">
                {shop.website_url && (
                  <a
                    href={shop.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <Globe size={18} className="mr-2" />
                    Visit Website
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
                {shop.telegram_url && (
                  <a
                    href={shop.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline bg-[#0088cc] text-white hover:bg-[#0088cc]/90"
                  >
                    <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.145.118.181.344.203.483.023.139.041.562.041.562z"/>
                    </svg>
                    Telegram Channel
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
            {user && !showReviewForm && (
              <button 
                onClick={() => setShowReviewForm(true)}
                className="btn btn-primary"
              >
                <MessageSquare size={18} className="mr-2" />
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm 
                shopId={shopId!} 
                onSuccess={() => {
                  setShowReviewForm(false);
                  fetchShopData();
                }} 
              />
            </div>
          )}

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-warning-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          className={i < review.rating ? '' : 'opacity-50'}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.user_name}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      • {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review this shop!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProfilePage;