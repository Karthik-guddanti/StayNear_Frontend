// client/src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  userInfo: UserInfo | null;
  isLoading: boolean; // ✅ FIX: Added isLoading state to the type
  login: (userData: UserInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // ✅ FIX: Added isLoading state to track the initial auth check
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // This effect runs only once on app startup
    try {
      const storedUserInfo = localStorage.getItem('staynear_userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      // Ensure user info is cleared if parsing fails
      setUserInfo(null);
    } finally {
      // ✅ FIX: Set loading to false after the check is complete
      setIsLoading(false);
    }
  }, []);

  const login = (userData: UserInfo) => {
    localStorage.setItem('staynear_userInfo', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem('staynear_userInfo');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};