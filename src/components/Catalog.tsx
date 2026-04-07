import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Plus } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { CATEGORIES } from '../data';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

export function Catalog({ onAddToCart }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      clearTimeout(timeoutId);
      const prods: Product[] = [];
      snapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      clearTimeout(timeoutId);
      console.error("Error fetching products:", error);
      setLoading(false); // Stop loading on error
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    // Fallback timeout in case onSnapshot never fires (e.g., offline with no cache)
    timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const categories = useMemo(() => {
    // If we have products, use the categories from the data file to ensure order
    // and only show categories that have products (plus 'Todos')
    const activeCats = new Set(products.map(p => p.category));
    return CATEGORIES.filter(cat => cat === 'Todos' || activeCats.has(cat));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (product.isVisible === false) return false;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  if (loading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center" id="cardapio">
        <p className="text-zinc-500">Carregando cardápio...</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto" id="cardapio">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
          placeholder="Pesquisar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar scroll-smooth">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            key={product.id}
            className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 flex flex-col"
          >
            <div className="relative h-32 sm:h-48 overflow-hidden shrink-0">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </div>
              )}
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-zinc-100 line-clamp-2">{product.name}</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                <div className="flex flex-col">
                  {product.price === 0 ? (
                    <span className="text-sm font-medium text-zinc-400">Consultar preço</span>
                  ) : product.promotionalPrice ? (
                    <>
                      <span className="text-xs text-zinc-500 line-through">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                      <span className="text-lg font-bold text-primary">R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-zinc-100">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors duration-300 group-hover:scale-110 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">Nenhum produto encontrado para "{searchQuery}".</p>
        </div>
      )}
    </section>
  );
}
