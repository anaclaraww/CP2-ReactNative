import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Tratamento } from '../types/user';

const AUTH_KEY = '@taskflow:auth';
const PREF_KEY = '@taskflow:prefs';

const USERS: User[] = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user',  password: '123', role: 'user',  name: 'Usuário Comum' },
];

interface AuthContextData {
  user: User | null;
  tratamento: Tratamento;
  isLoading: boolean;
  login: (username: string, password: string) => User | null;
  logout: () => void;
  setTratamento: (t: Tratamento) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tratamento, setTratamentoState] = useState<Tratamento>('Sr.');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      try {
        const [authRaw, prefRaw] = await Promise.all([
          AsyncStorage.getItem(AUTH_KEY),
          AsyncStorage.getItem(PREF_KEY),
        ]);
        if (authRaw) setUser(JSON.parse(authRaw) as User);
        if (prefRaw) {
          const prefs = JSON.parse(prefRaw) as { tratamento: Tratamento };
          setTratamentoState(prefs.tratamento);
        }
      } finally {
        setIsLoading(false);
      }
    }
    restore();
  }, []);

  function login(username: string, password: string): User | null {
    const found = USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (!found) return null;
    setUser(found);
    AsyncStorage.setItem(AUTH_KEY, JSON.stringify(found));
    return found;
  }

  function logout() {
    setUser(null);
    AsyncStorage.multiRemove([AUTH_KEY]);
  }

  function setTratamento(t: Tratamento) {
    setTratamentoState(t);
    AsyncStorage.setItem(PREF_KEY, JSON.stringify({ tratamento: t }));
  }

  return (
    <AuthContext.Provider
      value={{ user, tratamento, isLoading, login, logout, setTratamento }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
