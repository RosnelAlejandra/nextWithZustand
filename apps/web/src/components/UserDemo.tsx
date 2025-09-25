'use client';

import { useState } from 'react';
import { useUserStore } from '../stores';

export default function UserDemo() {
  const { user, setUser, logout } = useUserStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (name && email) {
      setUser({ name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">👤 Usuario con Persistencia</h3>
      
      {user ? (
        <div className="text-center">
          <div className="text-green-600 text-lg mb-2">✅ Usuario logueado</div>
          <div className="text-gray-800 mb-2">
            <strong>Nombre:</strong> {user.name}
          </div>
          <div className="text-gray-800 mb-4">
            <strong>Email:</strong> {user.email}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-gray-600 text-center mb-4">No hay usuario logueado</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full px-3 py-2 border rounded text-gray-800"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded text-gray-800"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
}