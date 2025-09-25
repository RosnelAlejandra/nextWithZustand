'use client';

import { useState } from 'react';
import { useTodoStore, useTodoStats } from '../stores';

export default function TodoDemo() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const stats = useTodoStats();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📋 Lista de Tareas</h3>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
        <div className="bg-blue-100 p-2 rounded">
          <div className="font-bold text-blue-600">{stats.total}</div>
          <div className="text-blue-800">Total</div>
        </div>
        <div className="bg-green-100 p-2 rounded">
          <div className="font-bold text-green-600">{stats.completed}</div>
          <div className="text-green-800">Completadas</div>
        </div>
        <div className="bg-yellow-100 p-2 rounded">
          <div className="font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-yellow-800">Pendientes</div>
        </div>
      </div>

      {/* Agregar nueva tarea */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Nueva tarea..."
          className="flex-1 px-3 py-2 border rounded text-gray-800"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No hay tareas. ¡Agrega tu primera tarea!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 border rounded ${
                todo.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'text-green-600 line-through'
                    : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}