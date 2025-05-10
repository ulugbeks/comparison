import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('app.name')}</h3>
            <p className="text-gray-300 mb-4">
              {t('app.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('nav.categories')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.electronics')}
                </Link>
              </li>
              <li>
                <Link to="/category/phones" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.phones')}
                </Link>
              </li>
              <li>
                <Link to="/category/appliances" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.appliances')}
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.fashion')}
                </Link>
              </li>
              <li>
                <Link to="/category/all" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.all')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/for-vendors" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.forVendors')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.faq')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:support@uzbcompare.uz" className="text-gray-300 hover:text-white transition-colors">
                  support@uzbcompare.uz
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+998901234567" className="text-gray-300 hover:text-white transition-colors">
                  +998 90 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>
            {t('footer.copyright').replace('2025', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;