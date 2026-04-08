import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { PixModal } from './components/PixModal';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { Product, CartItem, OrderData } from './types';

export default function App() {
  // ==========================================
  // CONTROLE DE SUSPENSÃO DO SITE
  // Mude para 'false' quando o cliente pagar para reativar o site.
  // ==========================================
  const IS_SUSPENDED = false;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [pixAmount, setPixAmount] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  if (IS_SUSPENDED) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-zinc-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
          Site Temporariamente Indisponível
        </h1>
        <p className="text-zinc-400 max-w-md text-lg">
          Este sistema está passando por manutenção ou encontra-se temporariamente suspenso. 
          Por favor, tente acessar novamente mais tarde.
        </p>
      </div>
    );
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const WHATSAPP_NUMBER = "5561984673556";

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const handleUpdateObservation = (productId: string, observation: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, observation } : item
      )
    );
  };

  const formatWhatsAppMessage = (data: OrderData, items: CartItem[], total: number) => {
    const hasPriceOnRequest = items.some(item => item.product.price === 0);
    let message = `Olá! 🎂 Pedido realizado:\n\n`;
    
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.product.name}\n`;
      if (item.observation) {
        message += `  Obs: ${item.observation}\n`;
      }
    });

    message += `\n📅 Data: ${data.date.split('-').reverse().join('/')}\n`;
    message += `👤 Nome: ${data.name}\n`;
    message += `📞 Telefone: ${data.phone}\n`;
    message += `📦 Modalidade: ${data.mode === 'entrega' ? 'Entrega' : 'Retirada'}\n`;
    
    if (data.mode === 'entrega' && data.address) {
      message += `📍 Endereço: ${data.address}\n`;
    }
    
    if (data.coupon) {
      message += `🎟️ Cupom: ${data.coupon}\n`;
    }

    message += `💳 Pagamento: ${data.payment} ${data.payment === 'Pix' ? '— pago' : ''}\n`;
    message += `💰 Total: ${hasPriceOnRequest ? 'Consultar preço' : `R$ ${total.toFixed(2).replace('.', ',')}`}\n\n`;
    message += `Obrigado(a)!`;

    return encodeURIComponent(message);
  };

  const handleCheckout = async (data: OrderData) => {
    const subtotal = cartItems.reduce((acc, item) => {
      const price = item.product.promotionalPrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);
    const deliveryFee = data.mode === 'entrega' ? 8.00 : 0;
    const total = subtotal + deliveryFee;

    setOrderData(data);

    // Save order to Firestore
    try {
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('./firebase');
      
      const orderToSave = {
        customerName: data.name,
        customerPhone: data.phone,
        mode: data.mode,
        address: data.address || null,
        date: data.date || null,
        payment: data.payment,
        total: total,
        status: 'Pendente',
        createdAt: serverTimestamp(),
        coupon: data.coupon || null,
        items: cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.promotionalPrice || item.product.price,
          observation: item.observation || null
        }))
      };

      // Clean up undefined/null values
      Object.keys(orderToSave).forEach(key => {
        if ((orderToSave as any)[key] === null) {
          delete (orderToSave as any)[key];
        }
      });

      await addDoc(collection(db, 'orders'), orderToSave);
    } catch (error) {
      console.error("Error saving order to Firestore:", error);
      const { handleFirestoreError, OperationType } = await import('./firebase');
      handleFirestoreError(error, OperationType.CREATE, 'orders');
      // We still proceed with WhatsApp even if saving fails
    }

    if (data.payment === 'Pix') {
      setPixAmount(total);
      setIsPixModalOpen(true);
    } else {
      finishOrder(data, total);
    }
  };

  const finishOrder = (data: OrderData, total: number) => {
    const message = formatWhatsAppMessage(data, cartItems, total);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setCartItems([]);
    setIsCartOpen(false);
    setIsPixModalOpen(false);
  };

  const handlePixConfirm = () => {
    if (orderData) {
      finishOrder(orderData, pixAmount);
    }
  };

  const openWhatsAppGeneral = () => {
    const message = encodeURIComponent("Olá! Gostaria de tirar uma dúvida.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-primary/30 overflow-x-hidden">
      <Hero onOpenWhatsApp={openWhatsAppGeneral} />
      
      <main>
        <Catalog onAddToCart={handleAddToCart} />
        <HowItWorks />
        <About />
      </main>

      <Footer onOpenWhatsApp={openWhatsAppGeneral} />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/30 hover:bg-primary-hover hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 ${totalItems > 0 && !isCartOpen ? 'right-24' : 'right-6'} z-40 bg-zinc-800 text-white p-3 rounded-full shadow-xl hover:bg-zinc-700 hover:scale-105 transition-all duration-300 flex items-center justify-center`}
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateObservation={handleUpdateObservation}
        onCheckout={handleCheckout}
      />

      <PixModal
        isOpen={isPixModalOpen}
        amount={pixAmount}
        onClose={() => setIsPixModalOpen(false)}
        onConfirm={handlePixConfirm}
      />

      <AdminPanel />
    </div>
  );
}
