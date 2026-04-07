import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, MapPin, Store, Calendar, Ticket, CreditCard, Banknote, QrCode } from 'lucide-react';
import { CartItem, OrderData } from '../types';
import { cn } from '../lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onUpdateObservation: (productId: string, observation: string) => void;
  onCheckout: (orderData: OrderData) => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onUpdateObservation, onCheckout }: CartDrawerProps) {
  const [formData, setFormData] = useState<Partial<OrderData>>({
    mode: 'entrega',
    payment: 'Pix',
    date: new Date().toISOString().split('T')[0]
  });

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.promotionalPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);
  const deliveryFee = formData.mode === 'entrega' ? 8.00 : 0;
  const total = subtotal + deliveryFee;

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || (formData.mode === 'entrega' && !formData.address)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onCheckout(formData as OrderData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-white">Seu Pedido</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-lg font-medium text-zinc-300 mb-2">Seu carrinho está vazio</h3>
                <p className="text-zinc-500 mb-6">Adicione alguns pratos deliciosos para continuar.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-hover transition-colors"
                >
                  Ver Cardápio
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                  
                  {/* Items List */}
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-20 h-20 object-cover rounded-xl border border-zinc-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-zinc-100 line-clamp-1">{item.product.name}</h4>
                          <p className="text-primary font-medium mt-1">
                            {item.product.price === 0 
                              ? 'Consultar preço' 
                              : `R$ ${((item.product.promotionalPrice || item.product.price) * item.quantity).toFixed(2).replace('.', ',')}`}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center bg-zinc-900 rounded-full border border-zinc-800">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <input
                            type="text"
                            placeholder="Observação (ex: sem cebola)"
                            value={item.observation || ''}
                            onChange={(e) => onUpdateObservation(item.product.id, e.target.value)}
                            className="mt-3 w-full text-sm bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-zinc-800" />

                  {/* Checkout Form */}
                  <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Seus Dados</h3>
                      <input
                        type="text"
                        required
                        placeholder="Nome completo *"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp *"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Delivery Mode */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Modalidade</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mode: 'entrega' })}
                          className={cn(
                            "flex items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                            formData.mode === 'entrega'
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                          )}
                        >
                          <MapPin className="w-4 h-4" />
                          Entrega
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mode: 'retirada' })}
                          className={cn(
                            "flex items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                            formData.mode === 'retirada'
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                          )}
                        >
                          <Store className="w-4 h-4" />
                          Retirada
                        </button>
                      </div>

                      {/* Address Field (Conditional) */}
                      <AnimatePresence>
                        {formData.mode === 'entrega' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <input
                              type="text"
                              required
                              placeholder="Endereço completo *"
                              value={formData.address || ''}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all mt-2"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Date */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Data do Pedido</h3>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-zinc-500" />
                        </div>
                        <input
                          type="date"
                          required
                          value={formData.date || ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Coupon */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Cupom</h3>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Ticket className="h-5 w-5 text-zinc-500" />
                        </div>
                        <input
                          type="text"
                          placeholder="Digite seu cupom"
                          value={formData.coupon || ''}
                          onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all uppercase"
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Pagamento</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Pix', 'Cartão', 'Dinheiro'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setFormData({ ...formData, payment: method })}
                            className={cn(
                              "flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                              formData.payment === method
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                            )}
                          >
                            {method === 'Pix' && <QrCode className="w-5 h-5" />}
                            {method === 'Cartão' && <CreditCard className="w-5 h-5" />}
                            {method === 'Dinheiro' && <Banknote className="w-5 h-5" />}
                            <span className="text-xs font-medium">{method}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </form>
                </div>

                {/* Footer / Total */}
                <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-950 pb-safe">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span>{cart.some(i => i.product.price === 0) ? 'Consultar preço' : `R$ ${subtotal.toFixed(2).replace('.', ',')}`}</span>
                    </div>
                    {formData.mode === 'entrega' && (
                      <div className="flex justify-between text-zinc-400">
                        <span>Taxa de entrega</span>
                        <span>{cart.some(i => i.product.price === 0) ? 'A combinar' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-zinc-800">
                      <span>Total</span>
                      <span className="text-primary">{cart.some(i => i.product.price === 0) ? 'Consultar preço' : `R$ ${total.toFixed(2).replace('.', ',')}`}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-lg"
                    >
                      Finalizar Pedido
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      Continuar comprando
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
