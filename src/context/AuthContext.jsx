import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Public site users only
const mockUsers = [
  { id: 1, email: 'user@prime.et',        password: 'User@123',  role: 'user', name: 'Adisu Dereje', avatar: null },
  { id: 2, email: 'adisu.user@prime.et',  password: 'Adisu@123', role: 'user', name: 'Adisu Dereje', avatar: null },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError]     = useState('');
  const [loading, setLoading]         = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError('');
    await new Promise(r => setTimeout(r, 700));
    const found = mockUsers.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    setLoading(false);
    if (found) {
      setCurrentUser(found);
      return { ok: true, role: found.role };
    } else {
      setAuthError('Invalid email or password. Please try again.');
      return { ok: false };
    }
  };

  const logout = () => { setCurrentUser(null); setAuthError(''); };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authError, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
