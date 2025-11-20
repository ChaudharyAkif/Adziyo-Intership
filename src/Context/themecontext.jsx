import React, { createContext, useState } from "react";


export const Themecontext = createContext();

export const Theme = ({ children }) => {
  const storedTheme = localStorage.getItem("isDarkMode");

  const [isDark, setIsDark] = useState(
    storedTheme ? JSON.parse(storedTheme) : false // default = false
  );

  return (
    <Themecontext.Provider value={[isDark, setIsDark]}>
      {children}
    </Themecontext.Provider>
  );
};
