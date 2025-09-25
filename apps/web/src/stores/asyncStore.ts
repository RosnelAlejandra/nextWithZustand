import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Tipos para los datos
interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  deletedId: number;
}

// Simulamos una API con tipos explícitos
const fakeApi = {
  fetchUsers: (): Promise<User[]> => 
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) { // 80% de éxito
          resolve([
            { id: 1, name: 'Juan Pérez', email: 'juan@email.com' },
            { id: 2, name: 'María García', email: 'maria@email.com' },
            { id: 3, name: 'Carlos López', email: 'carlos@email.com' },
          ]);
        } else {
          reject(new Error('Error de red - no se pudieron cargar los usuarios'));
        }
      }, 1500); // Simula latencia de red
    }),

  createUser: (userData: CreateUserData): Promise<User> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.name && userData.email) {
          resolve({
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
          });
        } else {
          reject(new Error('Datos de usuario inválidos'));
        }
      }, 1000);
    }),

  deleteUser: (userId: number): Promise<ApiResponse> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId) {
          resolve({ success: true, deletedId: userId });
        } else {
          reject(new Error('ID de usuario requerido'));
        }
      }, 800);
    })
};

// Interface para el estado
interface AsyncState {
  // Estado de datos
  users: User[];
  
  // Estados de loading (puedes tener múltiples)
  isLoadingUsers: boolean;
  isCreatingUser: boolean;
  isDeletingUser: boolean;
  
  // Estado de errores
  error: string | null;
  
  // Acciones asíncronas
  fetchUsers: () => Promise<void>;
  createUser: (userData: CreateUserData) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  
  // Acciones síncronas de limpieza
  clearError: () => void;
  clearUsers: () => void;
}

// Función helper para manejar errores de forma segura
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Error desconocido';
};

// Store con operaciones asíncronas
export const useAsyncStore = create<AsyncState>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      users: [],
      isLoadingUsers: false,
      isCreatingUser: false,
      isDeletingUser: false,
      error: null,

      // ✅ FETCH USERS - Cargar lista de usuarios
      fetchUsers: async () => {
        // 1. PENDING STATE
        set({ isLoadingUsers: true, error: null }, false, 'fetchUsers/pending');
        
        try {
            // 2. API CALL
            const users = await fakeApi.fetchUsers();
            
            // 3. FULFILLED STATE
            set({ 
            users, 
            isLoadingUsers: false 
            }, false, 'fetchUsers/fulfilled');
            
        } catch (error) {
            // 4. REJECTED STATE
            set({ 
            error: getErrorMessage(error), 
            isLoadingUsers: false 
            }, false, 'fetchUsers/rejected');
        }
        },

      // ✅ CREATE USER - Crear nuevo usuario
      createUser: async (userData: CreateUserData) => {
        set({ isCreatingUser: true, error: null }, false, 'createUser/pending');
        
        try {
          const newUser = await fakeApi.createUser(userData);
          const currentUsers = get().users;
          
          set({ 
            users: [...currentUsers, newUser],
            isCreatingUser: false 
          }, false, 'createUser/fulfilled');
          
        } catch (error) {
          set({ 
            error: getErrorMessage(error), 
            isCreatingUser: false 
          }, false, 'createUser/rejected');
        }
      },

      // ✅ DELETE USER - Eliminar usuario
      deleteUser: async (userId: number) => {
        set({ isDeletingUser: true, error: null }, false, 'deleteUser/pending');
        
        try {
          await fakeApi.deleteUser(userId);
          const currentUsers = get().users;
          
          set({ 
            users: currentUsers.filter(user => user.id !== userId),
            isDeletingUser: false 
          }, false, 'deleteUser/fulfilled');
          
        } catch (error) {
          set({ 
            error: getErrorMessage(error), 
            isDeletingUser: false 
          }, false, 'deleteUser/rejected');
        }
      },

      // ✅ CLEAR ERROR - Limpiar errores
      clearError: () => set({ error: null }, false, 'clearError'),

      // ✅ CLEAR USERS - Limpiar lista
      clearUsers: () => set({ users: [], error: null }, false, 'clearUsers'),
    }),
    {
      name: 'async-store',
    }
  )
);