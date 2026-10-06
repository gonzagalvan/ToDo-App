import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { User } from '../types/user';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  /** true mientras se restaura la sesión guardada al iniciar la app */
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Al abrir la app, restauramos la sesión guardada en AsyncStorage.
  useEffect(() => {
    let active = true;

    authService
      .getSessionUser()
      .then(sessionUser => {
        if (active) setUser(sessionUser);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // Evita actualizar estado si el componente se desmontó.
    return () => {
      active = false;
    };
  }, []);

  const login = async (loggedUser: User) => {
    await authService.saveSession(loggedUser.id);
    setUser(loggedUser);
  };

  const logout = async () => {
    await authService.clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
}
