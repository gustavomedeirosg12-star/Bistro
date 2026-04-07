export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  popular?: boolean;
  isVisible?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  observation?: string;
}

export interface OrderData {
  name: string;
  phone: string;
  mode: 'retirada' | 'entrega';
  address?: string;
  date: string;
  coupon?: string;
  payment: 'Pix' | 'Cartão' | 'Dinheiro';
}
