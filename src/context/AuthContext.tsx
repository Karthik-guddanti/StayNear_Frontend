// 👇 CORRECTED: Use 'type' keyword for type-only imports
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  userInfo: UserInfo | null;
  login: (userData: UserInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('staynear_userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = (userData: UserInfo) => {
    setUserInfo(userData);
    localStorage.setItem('staynear_userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('staynear_userInfo');
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};