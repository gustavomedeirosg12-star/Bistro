import { Instagram, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
}

export function Footer({ onOpenWhatsApp }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co/vCmzpRZ0/163633357-888132351981831-2192227033500298184-n.jpg" 
                alt="Logo" 
                loading="lazy"
                decoding="async"
                className="w-10 h-10 rounded-full object-cover shadow-lg border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <span className="text-white font-serif font-semibold text-lg tracking-wide">DEGUSTE BISTRÔ</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Gastronomia, comida caseira e executiva. Sabor e qualidade entregues diretamente na sua casa.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/deguste_bistro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <button onClick={onOpenWhatsApp} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-whatsapp hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>QE 15 Conjunto N Casa 13<br />Guará 2</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(61) 98467-3556</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-primary shrink-0 opacity-0" />
                <span>(61) 99375-4827</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Horários</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-300">Terça a Domingo</p>
                  <p>11:00 às 15:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <div className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-medium text-zinc-300">Segunda-feira</p>
                  <p>Fechado</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Localização</h4>
            <div className="w-full h-32 rounded-xl overflow-hidden border border-zinc-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.745123456789!2d-47.98765432109876!3d-15.82345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ5JzI0LjQiUyA0N8KwNTknMTUuNiJX!5e0!3m2!1spt-BR!2sbr!4v1711920000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} DEGUSTE BISTRÔ. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
