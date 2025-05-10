import { Product, Vendor, Category, FilterGroup, ActivityItem } from '../types';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Apple iPhone 13 Pro 128GB Sierra Blue',
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 9500000,
    oldPrice: 10200000,
    currency: 'UZS',
    vendorCount: 12,
    rating: 4.8,
    reviewCount: 245,
    category: 'phones',
    priceChange: 'down',
    description: 'A15 Bionic chip, Super Retina XDR display with ProMotion, Pro camera system with 3x optical zoom, Cinematic mode, and ProRes video.',
    specifications: [
      { name: 'Display', value: '6.1" Super Retina XDR' },
      { name: 'Processor', value: 'A15 Bionic' },
      { name: 'Storage', value: '128GB' },
      { name: 'Camera', value: 'Pro 12MP system' },
      { name: 'Battery', value: 'Up to 22 hours' }
    ],
    vendors: [
      { 
        id: 'v1', 
        name: 'Apple Store Tashkent', 
        logo: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=50', 
        rating: 4.9, 
        reviewCount: 892, 
        price: 9500000, 
        inStock: true,
        deliveryInfo: 'Free delivery, 2-3 days'
      },
      { 
        id: 'v2', 
        name: 'UzTech Store', 
        logo: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=50', 
        rating: 4.5, 
        reviewCount: 345, 
        price: 9650000, 
        inStock: true,
        deliveryInfo: 'Delivery 5000 UZS, 1-2 days'
      },
      { 
        id: 'v3', 
        name: 'Mobile World', 
        logo: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=50', 
        rating: 4.3, 
        reviewCount: 211, 
        price: 9700000, 
        inStock: true,
        deliveryInfo: 'Free pickup'
      }
    ]
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22 Ultra 256GB Phantom Black',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 8700000,
    currency: 'UZS',
    vendorCount: 8,
    rating: 4.6,
    reviewCount: 189,
    category: 'phones',
    priceChange: null,
    description: 'Snapdragon 8 Gen 1 processor, 6.8" Dynamic AMOLED 2X display, 108MP camera system with 100x Space Zoom, S Pen support.'
  },
  {
    id: '3',
    name: 'MacBook Pro 14" M1 Pro 16GB RAM 512GB SSD',
    image: 'https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 16500000,
    oldPrice: 17200000,
    currency: 'UZS',
    vendorCount: 6,
    rating: 4.9,
    reviewCount: 132,
    category: 'computers',
    priceChange: 'down'
  },
  {
    id: '4',
    name: 'Sony PlayStation 5 Digital Edition',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 5800000,
    oldPrice: 5500000,
    currency: 'UZS',
    vendorCount: 4,
    rating: 4.7,
    reviewCount: 210,
    category: 'electronics',
    priceChange: 'up'
  },
  {
    id: '5',
    name: 'Samsung 55" QLED 4K Smart TV QN90A',
    image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 7200000,
    currency: 'UZS',
    vendorCount: 7,
    rating: 4.5,
    reviewCount: 98,
    category: 'electronics'
  },
  {
    id: '6',
    name: 'Apple AirPods Pro 2nd Generation',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2300000,
    oldPrice: 2500000,
    currency: 'UZS',
    vendorCount: 15,
    rating: 4.8,
    reviewCount: 324,
    category: 'electronics',
    priceChange: 'down'
  },
  {
    id: '7',
    name: 'Xiaomi Mi Robot Vacuum Cleaner',
    image: 'https://images.pexels.com/photos/4295/black-and-white-technology-home-office.jpg?auto=compress&cs=tinysrgb&w=800',
    price: 1800000,
    currency: 'UZS',
    vendorCount: 6,
    rating: 4.3,
    reviewCount: 87,
    category: 'appliances'
  },
  {
    id: '8',
    name: 'Dyson V11 Absolute Cordless Vacuum',
    image: 'https://images.pexels.com/photos/2253573/pexels-photo-2253573.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 3900000,
    currency: 'UZS',
    vendorCount: 4,
    rating: 4.7,
    reviewCount: 56,
    category: 'appliances'
  },
  {
    id: '9',
    name: 'Nike Air Zoom Pegasus 38 Running Shoes',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 950000,
    oldPrice: 1100000,
    currency: 'UZS',
    vendorCount: 9,
    rating: 4.4,
    reviewCount: 142,
    category: 'fashion',
    priceChange: 'down'
  },
  {
    id: '10',
    name: 'Adidas Ultraboost 22 Men\'s Running Shoes',
    image: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1250000,
    currency: 'UZS',
    vendorCount: 7,
    rating: 4.6,
    reviewCount: 118,
    category: 'fashion'
  },
  {
    id: '11',
    name: 'Canon EOS R5 Mirrorless Camera Body',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 19500000,
    currency: 'UZS',
    vendorCount: 3,
    rating: 4.9,
    reviewCount: 42,
    category: 'electronics'
  },
  {
    id: '12',
    name: 'DJI Mavic 3 Fly More Combo',
    image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 13800000,
    oldPrice: 14200000,
    currency: 'UZS',
    vendorCount: 2,
    rating: 4.8,
    reviewCount: 29,
    category: 'electronics',
    priceChange: 'down'
  },
  {
    id: '13',
    name: 'LG 27GL850-B 27" QHD Gaming Monitor',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 3200000,
    currency: 'UZS',
    vendorCount: 5,
    rating: 4.6,
    reviewCount: 78,
    category: 'computers'
  },
  {
    id: '14',
    name: 'ASUS ROG Strix G15 Gaming Laptop',
    image: 'https://images.pexels.com/photos/8101336/pexels-photo-8101336.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 12500000,
    currency: 'UZS',
    vendorCount: 4,
    rating: 4.5,
    reviewCount: 62,
    category: 'computers'
  },
  {
    id: '15',
    name: 'Samsung Galaxy Tab S8+ 128GB Wi-Fi',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 7800000,
    oldPrice: 8200000,
    currency: 'UZS',
    vendorCount: 6,
    rating: 4.7,
    reviewCount: 89,
    category: 'phones',
    priceChange: 'down'
  },
  {
    id: '16',
    name: 'Bose QuietComfort 45 Wireless Headphones',
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2800000,
    currency: 'UZS',
    vendorCount: 8,
    rating: 4.8,
    reviewCount: 124,
    category: 'electronics'
  },
  {
    id: '17',
    name: 'Philips Airfryer XXL',
    image: 'https://images.pexels.com/photos/4051569/pexels-photo-4051569.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1900000,
    oldPrice: 2100000,
    currency: 'UZS',
    vendorCount: 7,
    rating: 4.4,
    reviewCount: 97,
    category: 'appliances',
    priceChange: 'down'
  },
  {
    id: '18',
    name: 'GoPro HERO10 Black',
    image: 'https://images.pexels.com/photos/3746226/pexels-photo-3746226.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 4300000,
    currency: 'UZS',
    vendorCount: 5,
    rating: 4.6,
    reviewCount: 73,
    category: 'electronics'
  },
  {
    id: '19',
    name: 'Fitbit Charge 5 Fitness Tracker',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1500000,
    currency: 'UZS',
    vendorCount: 9,
    rating: 4.3,
    reviewCount: 112,
    category: 'electronics'
  },
  {
    id: '20',
    name: 'Nespresso Vertuo Coffee Machine',
    image: 'https://images.pexels.com/photos/4825731/pexels-photo-4825731.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2100000,
    oldPrice: 1950000,
    currency: 'UZS',
    vendorCount: 4,
    rating: 4.5,
    reviewCount: 67,
    category: 'appliances',
    priceChange: 'up'
  }
];

// Mock filter data
export const mockFilters: FilterGroup[] = [
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { id: 'apple', name: 'Apple', count: 42 },
      { id: 'samsung', name: 'Samsung', count: 38 },
      { id: 'xiaomi', name: 'Xiaomi', count: 27 },
      { id: 'sony', name: 'Sony', count: 21 },
      { id: 'lg', name: 'LG', count: 19 },
      { id: 'asus', name: 'Asus', count: 16 },
      { id: 'hp', name: 'HP', count: 14 },
      { id: 'dell', name: 'Dell', count: 12 }
    ]
  },
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { id: '4-up', name: '4★ & up', count: 143 },
      { id: '3-up', name: '3★ & up', count: 197 },
      { id: '2-up', name: '2★ & up', count: 208 },
      { id: '1-up', name: '1★ & up', count: 210 }
    ]
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { id: 'in-stock', name: 'In Stock', count: 185 },
      { id: 'out-of-stock', name: 'Out of Stock', count: 25 }
    ]
  },
  {
    id: 'vendor',
    name: 'Vendor',
    options: [
      { id: 'uztech', name: 'UzTech Store', count: 76 },
      { id: 'apple-store', name: 'Apple Store Tashkent', count: 42 },
      { id: 'mobile-world', name: 'Mobile World', count: 68 },
      { id: 'tech-plaza', name: 'Tech Plaza', count: 53 },
      { id: 'mediapark', name: 'MediaPark', count: 47 },
      { id: 'citytech', name: 'CityTech', count: 39 }
    ]
  }
];

// Mock admin dashboard activity data
export const mockActivities: ActivityItem[] = [
  {
    id: 'a1',
    type: 'product',
    title: 'New product added',
    description: 'Added "Apple iPhone 14 Pro Max 256GB" to the database',
    timestamp: '2 hours ago',
    user: {
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 'a2',
    type: 'price',
    title: 'Price change detected',
    description: 'Price drop for "Samsung Galaxy S22 Ultra" from UZS 9,200,000 to UZS 8,700,000',
    timestamp: '4 hours ago'
  },
  {
    id: 'a3',
    type: 'vendor',
    title: 'New vendor joined',
    description: 'Vendor "ElectroMart" has been approved and added to the platform',
    timestamp: '7 hours ago',
    user: {
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 'a4',
    type: 'user',
    title: 'User registration',
    description: '12 new users registered in the last 24 hours',
    timestamp: '1 day ago'
  },
  {
    id: 'a5',
    type: 'product',
    title: 'Product updated',
    description: 'Updated specifications for "MacBook Pro 14" M1 Pro"',
    timestamp: '1 day ago',
    user: {
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  }
];