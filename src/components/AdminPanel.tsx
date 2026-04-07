import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, loginWithGoogle, logout, auth, handleFirestoreError, OperationType } from '../firebase';
import { Settings, LogOut, LogIn, Store, UtensilsCrossed, AlertTriangle, ClipboardList } from 'lucide-react';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';

export function AdminPanel() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProductsManager, setShowProductsManager] = useState(false);
  const [showOrdersManager, setShowOrdersManager] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    // Default admin check
    if ((user.email === 'gustavomedeirosg12@gmail.com' || user.email === 'Jokaacunha05@gmail.com') && user.emailVerified) {
      setIsAdmin(true);
      return;
    }

    // Check custom role in Firestore
    const checkAdminRole = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      }
    };
    
    checkAdminRole();
  }, [user]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button 
          onClick={loginWithGoogle}
          className="bg-white text-zinc-600 hover:text-zinc-900 p-2 rounded-full shadow-lg border border-zinc-200 transition-colors"
          title="Login Admin"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-white border border-zinc-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 min-w-[240px]">
        <div className="flex items-center gap-2 text-red-600 font-medium border-b border-zinc-100 pb-2">
          <AlertTriangle className="w-4 h-4" />
          Acesso Negado
        </div>
        <p className="text-xs text-zinc-600">
          A conta <strong className="text-zinc-900">{user.email}</strong> não tem permissão de administrador.
        </p>
        <button
          onClick={logout}
          className="w-full py-2 rounded-lg font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 bg-white border border-zinc-200 rounded-xl shadow-2xl p-4 flex flex-col gap-4 min-w-[240px]">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-2 text-zinc-900 font-medium">
            <Store className="w-4 h-4 text-primary" />
            Painel Admin
          </div>
          <button onClick={logout} className="text-zinc-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100">
          <button
            onClick={() => setShowOrdersManager(true)}
            className="w-full py-2 rounded-lg font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4" />
            Gerenciar Pedidos
          </button>
          <button
            onClick={() => setShowProductsManager(true)}
            className="w-full py-2 rounded-lg font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Gerenciar Cardápio
          </button>
        </div>
      </div>

      {showProductsManager && (
        <AdminProducts onClose={() => setShowProductsManager(false)} />
      )}
      {showOrdersManager && (
        <AdminOrders onClose={() => setShowOrdersManager(false)} />
      )}
    </>
  );
}
