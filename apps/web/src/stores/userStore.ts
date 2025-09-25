import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Interface para el estado del usuario
interface UserState {
  user: {
    name: string;
    email: string;
    isLoggedIn: boolean;
  } | null;
  setUser: (user: { name: string; email: string }) => void;
  logout: () => void;
}

// Store del usuario (con persistencia)
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (userData) => 
          set({ 
            user: { 
              ...userData, 
              isLoggedIn: true 
            } 
          }, false, 'setUser'),
        logout: () => set({ user: null }, false, 'logout'),
      }),
      {
        name: 'user-storage', // clave para localStorage
      }
    ),
    {
      name: 'user-store',
    }
  )
);