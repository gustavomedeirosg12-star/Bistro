import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { X, Clock, CheckCircle, Truck, XCircle, Trash2, Search } from 'lucide-react';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  observation?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  mode: 'retirada' | 'entrega';
  address?: string;
  date?: string;
  payment: string;
  total: number;
  status: 'Pendente' | 'Preparando' | 'Em Rota' | 'Concluído' | 'Cancelado';
  createdAt: any;
  items: OrderItem[];
  coupon?: string;
}

interface AdminOrdersProps {
  onClose: () => void;
}

export function AdminOrders({ onClose }: AdminOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ords: Order[] = [];
      snapshot.forEach((doc) => {
        ords.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ords);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Erro ao atualizar status. Verifique suas permissões.");
      handleFirestoreError(error, OperationType.UPDATE, 'orders');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Erro ao excluir pedido. Verifique suas permissões.");
      handleFirestoreError(error, OperationType.DELETE, 'orders');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Preparando': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Em Rota': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Concluído': return 'bg-green-50 text-green-700 border-green-200';
      case 'Cancelado': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerPhone.includes(searchTerm) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 shrink-0">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900">Gerenciar Pedidos</h2>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row gap-4 shrink-0 bg-zinc-50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-xl py-2.5 pl-10 pr-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-zinc-300 rounded-xl py-2.5 px-4 text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Pendente">Pendente</option>
            <option value="Preparando">Preparando</option>
            <option value="Em Rota">Em Rota</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              Nenhum pedido encontrado.
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white border border-zinc-200 shadow-sm rounded-xl p-4 flex flex-col gap-4">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-zinc-900">{order.customerName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-zinc-500 flex flex-wrap gap-x-4 gap-y-1">
                      <span>📞 {order.customerPhone}</span>
                      <span>📅 {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString('pt-BR') : 'Data Indisponível'}</span>
                      <span className="text-zinc-400">ID: {order.id.slice(0, 8)}...</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                      className="bg-zinc-50 border border-zinc-300 rounded-lg py-1.5 px-3 text-sm text-zinc-900 focus:outline-none focus:border-primary"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Preparando">Preparando</option>
                      <option value="Em Rota">Em Rota</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir Pedido"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Items */}
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">Itens do Pedido</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-sm">
                          <div>
                            <span className="text-zinc-900 font-medium">{item.quantity}x {item.name}</span>
                            {item.observation && (
                              <p className="text-xs text-zinc-500 mt-0.5">Obs: {item.observation}</p>
                            )}
                          </div>
                          <span className="text-zinc-600 whitespace-nowrap ml-4">
                            {item.price === 0 ? 'Consultar preço' : `R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Payment Info */}
                  <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Modalidade:</span>
                      <span className="text-zinc-900 capitalize">{order.mode}</span>
                    </div>
                    {order.mode === 'entrega' && order.address && (
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Endereço:</span>
                        <span className="text-zinc-900 text-right max-w-[200px] truncate" title={order.address}>{order.address}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Pagamento:</span>
                      <span className="text-zinc-900">{order.payment}</span>
                    </div>
                    {order.coupon && (
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Cupom:</span>
                        <span className="text-primary font-medium">{order.coupon}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-zinc-200 font-bold">
                      <span className="text-zinc-900">Total:</span>
                      <span className="text-primary">
                        {order.items.some(i => i.price === 0) ? 'Consultar preço' : `R$ ${order.total.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
