import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, CheckCircle2, QrCode } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: () => void;
}

export function PixModal({ isOpen, amount, onClose, onConfirm }: PixModalProps) {
  const [copied, setCopied] = useState(false);
  const pixKey = "34992425286"; // User's requested phone number

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Pagamento Pix</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-zinc-400 text-sm uppercase tracking-wider font-medium">Valor a pagar</p>
                <p className="text-4xl font-bold text-white">
                  {amount === 0 ? 'Consultar preço' : `R$ ${amount.toFixed(2).replace('.', ',')}`}
                </p>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <p className="text-zinc-500 text-sm mb-2">Chave Pix (Celular)</p>
                <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-200 font-mono text-lg tracking-wider">{pixKey}</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500 font-medium">Copiado ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={onConfirm}
                  className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-teal-500/20"
                >
                  Já fiz o pagamento
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-transparent border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
