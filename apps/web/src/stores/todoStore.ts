import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Interface para el estado de tareas
interface TodoState {
  todos: Array<{
    id: number;
    text: string;
    completed: boolean;
  }>;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

// Store de tareas (ejemplo más complejo)
export const useTodoStore = create<TodoState>()(
  devtools(
    (set) => ({
      todos: [],
      addTodo: (text: string) => 
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text,
              completed: false,
            },
          ],
        }), false, 'addTodo'),
      toggleTodo: (id: number) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }), false, 'toggleTodo'),
      removeTodo: (id: number) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }), false, 'removeTodo'),
    }),
    {
      name: 'todo-store',
    }
  )
);

// Selector personalizado para obtener estadísticas de tareas
export const useTodoStats = () => {
  const todos = useTodoStore((state) => state.todos);
  
  return {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    pending: todos.filter((todo) => !todo.completed).length,
  };
};