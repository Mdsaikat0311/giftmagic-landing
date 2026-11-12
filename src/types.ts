export interface ProductPackage {
  id: string;
  name: string;
  bengaliName: string;
  badge?: string;
  description: string;
  regularPrice: number;
  salePrice: number;
  savings: number;
  isPopular?: boolean;
  includedItems: string[];
}

export interface CustomerOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryArea: 'inside_dhaka' | 'outside_dhaka';
  deliveryFee: number;
  packageId: string;
  packageName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  total: number;
  includeKidsPayel?: boolean;
  kidsPayelPrice?: number;
  hasGiftNote?: boolean;
  giftRecipient?: string;
  giftSender?: string;
  giftMessage?: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  paymentMethod: 'Cash on Delivery';
  wcOrderId?: string | number;
}

export interface ProductReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  image?: string;
  badgeText?: string;
}
