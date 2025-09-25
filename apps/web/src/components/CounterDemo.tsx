'use client';

import { useState } from 'react';
import { useCounterStore } from '../stores';

export default function CounterDemo() {
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();
  const [customValue, setCustomValue] = useState('');

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🔢 Contador con Zustand</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -1
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +1
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Cantidad personalizada"
            className="px-3 py-1 border rounded text-gray-800"
          />
          <button
            onClick={() => {
              const value = parseInt(customValue);
              if (!isNaN(value)) {
                incrementBy(value);
                setCustomValue('');
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}