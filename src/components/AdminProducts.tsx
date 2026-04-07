import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Product } from '../types';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Store, RefreshCw } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';

export function AdminProducts({ onClose }: { onClose: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES.filter(cat => cat !== 'Todos')[0] || 'Pratos Especiais');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');
  const [popular, setPopular] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const showFeedback = (text: string, type: 'success' | 'error') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showFeedback("A imagem deve ter no máximo 5MB.", "error");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setImage(dataUrl);
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setPromotionalPrice('');
    setCategory(CATEGORIES.filter(cat => cat !== 'Todos')[0] || 'Pratos Especiais');
    setImage('');
    setBadge('');
    setPopular(false);
    setIsVisible(true);
    setEditingProduct(null);
    setIsAdding(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description || '');
    setPrice(product.price.toString());
    setPromotionalPrice(product.promotionalPrice?.toString() || '');
    setCategory(product.category);
    setImage(product.image);
    setBadge(product.badge || '');
    setPopular(product.popular || false);
    setIsVisible(product.isVisible !== false);
    setIsAdding(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: any = {
      name,
      description,
      price: parseFloat(price),
      category,
      image,
      popular,
      isVisible
    };

    if (promotionalPrice) {
      productData.promotionalPrice = parseFloat(promotionalPrice);
    }
    if (badge) {
      productData.badge = badge;
    }

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        showFeedback("Produto atualizado com sucesso!", "success");
      } else {
        await addDoc(collection(db, 'products'), productData);
        showFeedback("Produto adicionado com sucesso!", "success");
      }
      resetForm();
    } catch (error: any) {
      console.error("Error saving product:", error);
      showFeedback(`Erro ao salvar: ${error.message || 'Verifique suas permissões'}`, "error");
      handleFirestoreError(error, editingProduct ? OperationType.UPDATE : OperationType.CREATE, 'products');
    }
  };

  const handleDelete = async (id: string) => {
    // Removed window.confirm due to iframe restrictions
    try {
      await deleteDoc(doc(db, 'products', id));
      showFeedback("Produto excluído com sucesso!", "success");
    } catch (error: any) {
      console.error("Error deleting product:", error);
      showFeedback(`Erro ao excluir: ${error.message || 'Verifique suas permissões'}`, "error");
      handleFirestoreError(error, OperationType.DELETE, 'products');
    }
  };

  const handleRestoreDefaults = async () => {
    // Removed window.confirm due to iframe restrictions
    setLoading(true);
    try {
      let count = 0;
      for (const prod of PRODUCTS) {
        const { id, ...productData } = prod;
        
        // Clean up undefined values that might cause Firestore issues
        const cleanData: any = {};
        Object.entries(productData).forEach(([key, value]) => {
          if (value !== undefined) {
            cleanData[key] = value;
          }
        });

        await addDoc(collection(db, 'products'), cleanData);
        count++;
      }
      showFeedback(`${count} produtos importados com sucesso!`, "success");
    } catch (error: any) {
      console.error("Error restoring products:", error);
      showFeedback(`Erro ao importar: ${error.message || JSON.stringify(error)}`, "error");
      handleFirestoreError(error, OperationType.CREATE, 'products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Feedback Message */}
        {feedbackMsg && (
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-lg shadow-lg text-sm font-medium ${
            feedbackMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {feedbackMsg.text}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 shrink-0">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900">Gerenciar Cardápio</h2>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
          {/* List of Products */}
          <div className={`w-full md:w-1/2 border-r border-zinc-200 overflow-y-auto p-4 ${isAdding || editingProduct ? 'hidden md:block' : 'block'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-zinc-900">Produtos Cadastrados</h3>
              <button 
                onClick={() => { resetForm(); setIsAdding(true); }}
                className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Novo
              </button>
            </div>

            {loading ? (
              <p className="text-zinc-500 text-center py-8">Carregando...</p>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <p className="text-zinc-500">Nenhum produto cadastrado.</p>
                <button 
                  onClick={handleRestoreDefaults}
                  className="flex items-center gap-2 bg-zinc-100 text-zinc-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Importar Produtos Iniciais
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pb-20">
                {products.map(product => (
                  <div key={product.id} className="flex items-center justify-between bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-zinc-200" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-zinc-900 font-medium truncate">{product.name}</p>
                          {product.isVisible === false && (
                            <span className="text-[10px] bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full border border-zinc-300 shrink-0">
                              Oculto
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-600 text-sm">R$ {product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => startEdit(product)} className="p-2 text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-200 rounded-lg transition-colors shadow-sm" title="Editar produto">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-zinc-500 hover:text-red-600 bg-white border border-zinc-200 rounded-lg transition-colors shadow-sm" title="Excluir produto">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 pt-6 border-t border-zinc-200 flex flex-col items-center">
                  <p className="text-xs text-zinc-500 mb-3 text-center">Faltando produtos originais?</p>
                  <button 
                    onClick={handleRestoreDefaults}
                    className="flex items-center gap-2 bg-zinc-50 text-zinc-500 px-4 py-2 rounded-lg text-xs font-medium hover:bg-zinc-100 hover:text-zinc-700 transition-colors border border-zinc-200"
                  >
                    <RefreshCw className="w-3 h-3" /> Restaurar Produtos Padrão
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Form Area */}
          <div className={`w-full md:w-1/2 overflow-y-auto p-6 bg-zinc-50/50 ${isAdding || editingProduct ? 'block' : 'hidden md:block'}`}>
            {(isAdding || editingProduct) ? (
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-zinc-900">
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                  </h3>
                  <button type="button" onClick={resetForm} className="md:hidden text-sm text-zinc-500 hover:text-zinc-900">
                    Voltar para lista
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nome do Produto *</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Descrição</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none" />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Preço (R$) *</label>
                    <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Preço Promocional (R$)</label>
                    <input type="number" step="0.01" value={promotionalPrice} onChange={e => setPromotionalPrice(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Opcional" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Categoria *</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                      {CATEGORIES.filter(cat => cat !== 'Todos').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Etiqueta (Badge)</label>
                    <input type="text" value={badge} onChange={e => setBadge(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Ex: Mais Vendido" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Imagem do Produto *</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer bg-white hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-lg text-sm transition-colors border border-zinc-300 flex items-center gap-2 shadow-sm">
                        <ImageIcon className="w-4 h-4" />
                        {isUploading ? 'Processando...' : image ? 'Trocar Imagem' : 'Escolher Imagem'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                      <span className="text-xs text-zinc-500">Ou cole uma URL abaixo</span>
                    </div>
                    <div className="flex-1 relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input required={!image} type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="w-full bg-white border border-zinc-300 rounded-lg pl-10 pr-4 py-2 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
                    </div>
                    {image && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-zinc-200 h-32 relative bg-zinc-100">
                        <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300/f4f4f5/a1a1aa?text=Erro+na+Imagem')} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="popular" checked={popular} onChange={e => setPopular(e.target.checked)} className="w-4 h-4 rounded border-zinc-300 bg-white text-primary focus:ring-primary" />
                    <label htmlFor="popular" className="text-sm font-medium text-zinc-700">Marcar como "Mais Pedido"</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isVisible" checked={isVisible} onChange={e => setIsVisible(e.target.checked)} className="w-4 h-4 rounded border-zinc-300 bg-white text-primary focus:ring-primary" />
                    <label htmlFor="isVisible" className="text-sm font-medium text-zinc-700">Visível no Cardápio</label>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={resetForm} className="flex-1 py-2 rounded-lg font-medium text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 transition-colors shadow-sm">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Save className="w-4 h-4" /> Salvar
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                <Store className="w-16 h-16 mb-4 opacity-20" />
                <p>Selecione um produto para editar</p>
                <p className="text-sm">ou clique em Novo para adicionar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
