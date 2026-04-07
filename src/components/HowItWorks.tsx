import { motion } from 'motion/react';
import { MousePointerClick, ChefHat, Motorbike } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Escolha',
    description: 'Navegue pelo nosso cardápio e escolha seus pratos favoritos.'
  },
  {
    icon: ChefHat,
    title: 'Encomende',
    description: 'Finalize o pedido pelo WhatsApp de forma rápida e segura.'
  },
  {
    icon: Motorbike,
    title: 'Receba',
    description: 'Acompanhe a entrega e receba seu pedido quentinho em casa.'
  }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Como Funciona</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Fazer seu pedido é muito simples. Em apenas 3 passos você recebe o melhor delivery da cidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-colors duration-300 shadow-xl">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 max-w-[250px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
