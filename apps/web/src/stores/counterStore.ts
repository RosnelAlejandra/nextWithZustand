import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Interface para el estado del contador
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (value: number) => void;
}

// Store del contador (simple)
export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),
      incrementBy: (value: number) => 
        set((state) => ({ count: state.count + value }), false, 'incrementBy'),
    }),
    {
      name: 'counter-store', // nombre para DevTools
    }
  )
);