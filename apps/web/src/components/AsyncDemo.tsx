'use client';

import { useState, useEffect } from 'react';
import { useAsyncStore } from '../stores';

export default function AsyncDemo() {
  const { 
    users, 
    isLoadingUsers, 
    isCreatingUser, 
    isDeletingUser,
    error,
    fetchUsers, 
    createUser, 
    deleteUser, 
    clearError,
    clearUsers 
  } = useAsyncStore();

  // Estado local para el formulario
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      await createUser({ name: name.trim(), email: email.trim() });
      // Solo limpiar el formulario si no hay error
      if (!useAsyncStore.getState().error) {
        setName('');
        setEmail('');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        ⚡ Operaciones Asíncronas con Zustand
      </h3>

      {/* Mostrar error si existe */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={clearError}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={fetchUsers}
          disabled={isLoadingUsers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoadingUsers ? '🔄 Cargando...' : '🔃 Recargar Usuarios'}
        </button>
        
        <button
          onClick={clearUsers}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          🗑️ Limpiar Lista
        </button>
      </div>

      {/* Formulario para crear usuario */}
      <form onSubmit={handleCreateUser} className="mb-6 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-3 text-gray-700">➕ Crear Nuevo Usuario</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="px-3 py-2 border rounded text-gray-800"
            disabled={isCreatingUser}
          />
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="email@ejemplo.com"
            className="px-3 py-2 border rounded text-gray-800"
            disabled={isCreatingUser}
          />
          <button
            type="submit"
            disabled={isCreatingUser || !name.trim() || !email.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isCreatingUser ? '⏳ Creando...' : '✅ Crear Usuario'}
          </button>
        </div>
      </form>

      {/* Lista de usuarios */}
      <div>
        <h4 className="font-semibold mb-3 text-gray-700">
          👥 Lista de Usuarios ({users.length})
        </h4>
        
        {isLoadingUsers ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Cargando usuarios...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No hay usuarios disponibles</p>
            <p className="text-sm mt-1">Haz clic en "Recargar Usuarios" para cargar datos</p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 border rounded"
              >
                <div>
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  {user.createdAt && (
                    <div className="text-xs text-gray-400">
                      Creado: {new Date(user.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  disabled={isDeletingUser}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {isDeletingUser ? '⏳' : '🗑️'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estados de loading específicos */}
      <div className="mt-4 text-xs text-gray-500 bg-gray-100 p-2 rounded">
        <strong>Estados actuales:</strong>
        <ul className="mt-1 space-y-1">
          <li>🔄 isLoadingUsers: {isLoadingUsers ? 'true' : 'false'}</li>
          <li>➕ isCreatingUser: {isCreatingUser ? 'true' : 'false'}</li>
          <li>🗑️ isDeletingUser: {isDeletingUser ? 'true' : 'false'}</li>
          <li>❌ error: {error ? `"${error}"` : 'null'}</li>
        </ul>
      </div>
    </div>
  );
}