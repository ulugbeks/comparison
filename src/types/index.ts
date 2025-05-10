// Product related types
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  currency: string;
  vendorCount: number;
  rating: number;
  reviewCount: number;
  category: string;
  isFavorite?: boolean;
  priceChange?: 'up' | 'down' | null;
  description?: string;
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  vendors?: Vendor[];
}

// Vendor related types
export interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  price: number;
  inStock: boolean;
  deliveryInfo?: string;
  url?: string;
}

// Category related types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
}

// Filter related types
export interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  favorites?: string[];
  priceAlerts?: PriceAlert[];
}

export interface PriceAlert {
  id: string;
  productId: string;
  price: number;
  isActive: boolean;
  createdAt: string;
}

// Admin dashboard related types
export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changePeriod?: string;
}

export interface ActivityItem {
  id: string;
  type: 'product' | 'vendor' | 'user' | 'price';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}