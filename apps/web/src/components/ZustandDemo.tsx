'use client';

import CounterDemo from './CounterDemo';
import UserDemo from './UserDemo';
import TodoDemo from './TodoDemo';
import AsyncDemo from './AsyncDemo';

// Componente principal que demuestra todas las funcionalidades
export default function ZustandDemo() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐻 Zustand Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prueba las diferentes funcionalidades de Zustand: estado simple, 
            persistencia en localStorage, selectores personalizados y más.
          </p>
        </div>
        
        <div className="m-2 w-full">
          <CounterDemo />
        </div>
        <div className="m-2 w-full">
          <UserDemo />
        </div>
        <div className="m-2 w-full">
            <TodoDemo />
        </div>
        <div className="m-2 w-full">
            <AsyncDemo />
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">📚 Características demostradas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">✨ Funcionalidades básicas:</h4>
              <ul className="space-y-1">
                <li>• Estado global compartido</li>
                <li>• Acciones para modificar el estado</li>
                <li>• Re-renderizado automático</li>
                <li>• TypeScript completo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">🔧 Características avanzadas:</h4>
              <ul className="space-y-1">
                <li>• Persistencia con localStorage</li>
                <li>• DevTools para debugging</li>
                <li>• Selectores personalizados</li>
                <li>• Múltiples stores especializados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}