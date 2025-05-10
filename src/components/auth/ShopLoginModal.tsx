import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@headlessui/react';
import { X, Mail, Lock, AlertCircle, Store } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface ShopLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopLoginModal: React.FC<ShopLoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      // First, attempt to sign in the user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        throw new Error('Invalid email or password');
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      // Then check if they are a shop owner
      const { data: shopOwner, error: shopError } = await supabase
        .from('shop_owners')
        .select('shop_id')
        .eq('user_id', authData.user.id)
        .single();

      if (shopError || !shopOwner) {
        // If the user exists but is not a shop owner, sign them out
        await supabase.auth.signOut();
        throw new Error('Your account is not authorized as a shop owner. Please contact support for assistance.');
      }

      // If we get here, the user is successfully authenticated and is a shop owner
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-center mb-6">
              <Store size={32} className="text-primary-500 mr-2" />
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {t('auth.shopSignIn')}
              </Dialog.Title>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-error-50 text-error-500 rounded-md flex items-center">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    required
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10"
                    required
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? t('auth.signingIn') : t('auth.signIn')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {t('auth.noShopAccount')}{' '}
                <a
                  href="mailto:support@elkor.uz"
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  {t('auth.contactSupport')}
                </a>
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ShopLoginModal;