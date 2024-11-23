import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context
interface UserContextProps {
  selectedUserThoughts: string | null;
  setSelectedUserThoughts: (thoughts: string | null) => void;
}

// Create the context with an undefined default value
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create the provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedUserThoughts, setSelectedUserThoughts] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ selectedUserThoughts, setSelectedUserThoughts }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
