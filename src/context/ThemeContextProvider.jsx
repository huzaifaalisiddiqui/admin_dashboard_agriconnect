import React, { Children, createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();
// i forgot to use the export here thats why it was not importing in other comps

const ThemeContextProvider = ({children}) => {

    const [theme, setTheme] = useState('light');

// if you write useEffect(() => {...}, []), it runs only once when the component mounts.
 // Without [], it runs on every render, which can slow down the app.

 useEffect( ()=>{  
    if(theme ==='dark'){
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

 } , [theme] );

 const toggleTheme = ()=>{
    setTheme(theme === 'light' ? 'dark' : 'light');
 };

  return (
    <ThemeContext.Provider value={ {theme, toggleTheme} }>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider