import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, MessageCircle, X, Clock, MapPin, Instagram } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeroProps {
  onOpenWhatsApp: () => void;
}

export function Hero({ onOpenWhatsApp }: HeroProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Use America/Sao_Paulo timezone for Brazil
      const timeString = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false });
      const [hourStr, minuteStr] = timeString.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      const day = now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long' }).toLowerCase();

      if (day.includes('segunda')) {
        setIsOpen(false);
        return;
      }

      const currentTime = hour * 60 + minute;
      const openTime = 11 * 60; // 11:00
      const closeTime = 15 * 60; // 15:00

      setIsOpen(currentTime >= openTime && currentTime <= closeTime);
    };

    // Check immediately
    checkStatus();

    // Check every minute
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 bg-zinc-950">
      {/* Background Image with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000" 
          alt="Restaurante" 
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />
      </motion.div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co/vCmzpRZ0/163633357-888132351981831-2192227033500298184-n.jpg" 
            alt="Logo" 
            loading="eager"
            decoding="async"
            className="w-10 h-10 rounded-full object-cover shadow-lg border border-zinc-800"
            referrerPolicy="no-referrer"
          />
          <span className="text-real-white font-serif font-semibold text-lg tracking-wide">DEGUSTE BISTRÔ</span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/deguste_bistro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-real-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
          >
            <Instagram className="w-4 h-4 text-primary" />
            @deguste_bistro
          </a>
          <button 
            onClick={onOpenWhatsApp}
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-real-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-whatsapp" />
            Dúvidas?
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-real-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-8 mt-16 text-center">
              <a href="#cardapio" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-real-white hover:text-primary transition-colors">Cardápio</a>
              <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-real-white hover:text-primary transition-colors">Como Funciona</a>
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-real-white hover:text-primary transition-colors">Sobre Nós</a>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenWhatsApp(); }} 
                className="text-2xl font-bold text-whatsapp mt-8 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-8 h-8" />
                Falar no WhatsApp
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center mt-40 md:mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif font-bold text-real-white mb-6 leading-tight"
        >
          Gastronomia <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">
            DEGUSTE BISTRÔ
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-real-white-muted mb-8 max-w-2xl mx-auto"
        >
          Gastronomia, comida caseira e executiva. Sabor e qualidade entregues diretamente na sua casa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 mt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isOpen ? "bg-green-500" : "bg-red-500"
              )} />
              {isOpen ? 'Aberto agora' : 'Fechado no momento'}
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <MapPin className="w-4 h-4 text-primary" />
              QE 15 Conjunto N Casa 13 Guará 2
            </div>
          </div>

          {/* Business Hours Illustration */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 w-full max-w-sm mt-2">
            <div className="flex items-center justify-center gap-2 mb-3 text-real-white">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-semibold">Horários de Funcionamento</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-real-white-muted">
              <div className="flex justify-between px-2">
                <span>Terça a Domingo</span>
                <span className="font-medium text-real-white">11:00 às 15:00</span>
              </div>
              <div className="flex justify-between px-2">
                <span>Segunda-feira</span>
                <span className="font-medium text-red-400">Fechado</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a 
        href="#cardapio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-real-white-muted hover:text-real-white transition-colors cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest">Ver Cardápio</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.a>
    </section>
  );
}
