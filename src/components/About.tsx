import { motion } from 'motion/react';

export function About() {
  return (
    <section id="sobre" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://image.pollinations.ai/prompt/traditional%20rustic%20food%20preparation%20wood%20fired%20oven%20dark%20moody%20cinematic?width=800&height=1200&nologo=true&model=flux&seed=127"
              alt="Tradição e Sabor"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-3xl font-serif font-bold mb-2">Tradição e Sabor</h3>
              <p className="text-zinc-300 text-lg">Desde 2015 servindo a cidade com amor.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              A verdadeira <span className="text-primary">experiência</span> gastronômica
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Tudo começou com uma pequena cozinha e um grande sonho: levar comida de verdade, feita com ingredientes selecionados e muito carinho, para a mesa das famílias da nossa cidade.
            </p>
            
            <div className="grid grid-cols-2 gap-4 my-6">
              <img 
                src="https://image.pollinations.ai/prompt/fresh%20ingredients%20tomatoes%20basil%20garlic%20on%20dark%20wood%20table?width=400&height=300&nologo=true&model=flux&seed=128" 
                alt="Ingredientes Frescos" 
                loading="lazy"
                decoding="async"
                className="rounded-2xl object-cover h-32 w-full shadow-lg border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://image.pollinations.ai/prompt/chef%20plating%20a%20gourmet%20dish%20dark%20restaurant%20kitchen?width=400&height=300&nologo=true&model=flux&seed=129" 
                alt="Preparo Cuidadoso" 
                loading="lazy"
                decoding="async"
                className="rounded-2xl object-cover h-32 w-full shadow-lg border border-zinc-800"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-lg text-zinc-400 leading-relaxed">
              Hoje, somos referência em delivery, mantendo a mesma qualidade e paixão do primeiro dia. Cada prato que sai da nossa cozinha carrega a nossa história e o nosso compromisso com o seu paladar.
            </p>
            
            <div className="pt-4 flex gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-gold mb-2">+5k</p>
                <p className="text-sm text-zinc-500 uppercase tracking-wider">Clientes Satisfeitos</p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center">
                <p className="text-4xl font-bold text-gold mb-2">9 Anos</p>
                <p className="text-sm text-zinc-500 uppercase tracking-wider">De Tradição</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
