import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation - in real app, this would be an API call
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userWithoutPassword = { ...foundUser };
          delete userWithoutPassword.password;
          setUser(userWithoutPassword);
          setIsLoading(false);
          resolve(userWithoutPassword);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const signup = async (userData) => {
    setIsLoading(true);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
          setIsLoading(false);
          reject(new Error('User with this email already exists'));
          return;
        }

        // Add new user
        const newUser = {
          id: Date.now(),
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Auto login after signup
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        setIsLoading(false);
        resolve(userWithoutPassword);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    // Update in registered users as well
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};