# 🐻 Zustand Demo - Proyecto de Aprendizaje

Proyecto simple construido con **Next.js** y **Nx** para probar y aprender las funcionalidades de **Zustand**, una librería de gestión de estado minimalista y poderosa.

## 🚀 Levantamiento del Proyecto

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Instalación y ejecución

```bash
# Clonar e instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
npx nx dev web
# o
npm run dev

# El proyecto estará disponible en http://localhost:3000
```

### Comandos adicionales

```bash
# Construir para producción
npx nx build web

# Ver todos los targets disponibles
npx nx show project web

# Visualizar el grafo del proyecto
npx nx graph
```

## 📋 Funcionalidades Implementadas

Este proyecto demuestra las capacidades principales de Zustand a través de cuatro componentes interactivos:

### 🔢 Contador (CounterDemo)
**Store**: `counterStore.ts`
**Funcionalidades**:
- ✅ Estado global simple
- ✅ Incremento/Decremento básico
- ✅ Reset del contador
- ✅ Incremento por valor personalizado
- ✅ DevTools integrado

### 👤 Usuario (UserDemo)  
**Store**: `userStore.ts`
**Funcionalidades**:
- ✅ Gestión de sesión de usuario
- ✅ Persistencia en localStorage
- ✅ Login/Logout
- ✅ Formulario de registro
- ✅ Estado persistente entre recargas

### 📋 Lista de Tareas (TodoDemo)
**Store**: `todoStore.ts`
**Funcionalidades**:
- ✅ CRUD completo de tareas
- ✅ Toggle de estado completado/pendiente
- ✅ Selector personalizado para estadísticas
- ✅ Contador automático (total, completadas, pendientes)
- ✅ Interfaz interactiva

### ⚡ Operaciones Asíncronas (AsyncDemo)
**Store**: `asyncStore.ts`
**Funcionalidades**:
- ✅ Llamadas API simuladas con latencia real
- ✅ Estados de loading granulares (fetch/create/delete)
- ✅ Manejo completo de errores con TypeScript
- ✅ Operaciones CRUD asíncronas
- ✅ Patrones pending/fulfilled/rejected
- ✅ Gestión de estado optimista
- ✅ Simulación de fallos de red (20% probabilidad)

## 🏗️ Arquitectura del Proyecto

### Estructura de Stores
```
src/stores/
├── counterStore.ts     # Estado del contador
├── userStore.ts        # Estado del usuario con persistencia
├── todoStore.ts        # Estado de tareas + selector personalizado
├── asyncStore.ts       # Operaciones asíncronas con API simulada
└── index.ts           # Punto central de exportación
```

### Estructura de Componentes
```
src/components/
├── CounterDemo.tsx     # Demo del contador
├── UserDemo.tsx        # Demo de usuario
├── TodoDemo.tsx        # Demo de lista de tareas
├── AsyncDemo.tsx       # Demo de operaciones asíncronas
└── ZustandDemo.tsx     # Componente principal que integra todos
```

## 🛠️ Características Técnicas Implementadas

### Middleware de Zustand
- **DevTools**: Debugging en todas las stores
- **Persist**: Persistencia automática en localStorage para usuario

### Patrones Implementados
- **Separación de responsabilidades**: Cada store maneja una funcionalidad específica
- **Selectores personalizados**: Hook `useTodoStats()` para estadísticas derivadas
- **Re-exportación centralizada**: Importaciones limpias desde `../stores`
- **TypeScript**: Tipado completo en todas las interfaces

### Funcionalidades de Zustand Demostradas

| Característica | Store | Descripción |
|-------------|-------|-------------|
| Estado básico | Counter | Estado simple con acciones |
| Persistencia | User | Datos guardados en localStorage |
| Selectores | Todo | Hook personalizado para estadísticas |
| Operaciones Async | Async | Llamadas API con pending/fulfilled/rejected |
| Loading States | Async | Estados granulares por operación |
| Error Handling | Async | Manejo type-safe de errores |
| DevTools | Todos | Debugging en navegador |
| Re-renders optimizados | Todos | Solo componentes afectados se actualizan |

## 🎯 Casos de Uso Demostrados

1. **Estado compartido**: El contador puede ser usado desde múltiples componentes
2. **Persistencia de datos**: Los datos del usuario persisten entre sesiones
3. **Estados complejos**: La lista de tareas demuestra operaciones CRUD
4. **Operaciones asíncronas**: API calls con manejo completo de estados
5. **Loading granular**: Estados específicos para cada operación (fetch/create/delete)
6. **Manejo de errores**: Gestión robusta con TypeScript type-safety
7. **Computed values**: Las estadísticas se calculan automáticamente
8. **Modularidad**: Cada store es independiente y reutilizable

## 🧪 Para Experimentar

1. **Abre las DevTools del navegador** → Pestaña "Redux" para ver el estado
2. **Recarga la página** → El usuario logueado persiste, pero contador y tareas se resetean
3. **Prueba el AsyncDemo** → Observa los estados de loading y la simulación de errores
4. **Inspecciona los DevTools** → Ve el flujo pending → fulfilled/rejected en tiempo real
3. **Múltiples pestañas** → El estado del usuario se sincroniza automáticamente
4. **Inspecciona el código** → Ve cómo cada store maneja su estado independientemente

## ⚡ Patrones Async Avanzados Implementados

### � **Estados de Loading Granulares**
```typescript
// ✅ En lugar de un solo loading global
isLoadingUsers: boolean,    // Específico para fetch
isCreatingUser: boolean,    // Específico para create  
isDeletingUser: boolean,    // Específico para delete
```

### 🛡️ **Manejo de Errores Type-Safe**
```typescript
// ✅ Helper function para TypeScript
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Error desconocido';
};
```

### 🎯 **Patrón Pending/Fulfilled/Rejected**
```typescript
// ✅ Como Redux Toolkit pero más simple
fetchUsers: async () => {
  set({ isLoadingUsers: true, error: null }, false, 'fetchUsers/pending');
  try {
    const users = await api.fetchUsers();
    set({ users, isLoadingUsers: false }, false, 'fetchUsers/fulfilled');
  } catch (error) {
    set({ error: getErrorMessage(error), isLoadingUsers: false }, false, 'fetchUsers/rejected');
  }
}
```

### 🔗 **Función get() para Estado Actual**
```typescript
// ✅ Acceder al estado actual sin re-renders
const currentUsers = get().users;
set({ users: [...currentUsers, newUser] });
```

## �📚 Recursos de Aprendizaje

- [Documentación oficial de Zustand](https://github.com/pmndrs/zustand)
- [Middleware disponibles](https://github.com/pmndrs/zustand#middleware)
- [Comparación con otras librerías](https://github.com/pmndrs/zustand#comparison)
- [TypeScript con Zustand](https://github.com/pmndrs/zustand#typescript)

---

## 📚 Información Original de Nx

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

Este proyecto fue creado con **Nx**, un sistema de construcción inteligente e rápido.

### Comandos útiles de Nx

```bash
# Visualizar el grafo de dependencias
npx nx graph

# Ver todos los proyectos
npx nx show projects

# Generar nueva aplicación
npx nx g @nx/next:app demo

# Generar nueva librería
npx nx g @nx/react:lib mylib
```

### Enlaces útiles
- [Documentación de Nx](https://nx.dev)
- [Nx Console para VS Code](https://nx.dev/getting-started/editor-setup)
- [Comunidad en Discord](https://go.nx.dev/community)
- [Nx en Twitter](https://twitter.com/nxdevtools)
