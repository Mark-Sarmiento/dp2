import React, { createContext, useState } from 'react';

export const CurrentValueContext = createContext(null);

export const CurrentValueProvider = ({ children }) => {
  const [currentValue, setCurrentValue] = useState(null);

  return (
    <CurrentValueContext.Provider value={{ currentValue, setCurrentValue }}>
      {children}
    </CurrentValueContext.Provider>
  );
};
