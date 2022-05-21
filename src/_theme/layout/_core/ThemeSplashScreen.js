import React, {createContext, useContext, useState, useEffect} from "react";

const ThemeSplashScreenContext = createContext();

export function ThemeSplashScreenProvider({ children }) {
  const [count, setCount] = useState(0);
  let visible = count > 0;

  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove("hidden");

      return () => {
        splashScreen.classList.add("hidden");
      };
    }

    // Hide SplashScreen
    let timeout;
    if (splashScreen && !visible) {
      timeout = setTimeout(() => {
        splashScreen.classList.add("hidden");
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <ThemeSplashScreenContext.Provider value={setCount}>
      {children}
    </ThemeSplashScreenContext.Provider>
  );
}

export function LayoutSplashScreen({ visible = true }) {
  // Everything are ready - remove splashscreen
  const setCount = useContext(ThemeSplashScreenContext);

  // useEffect(() => {
  //   if (!visible) {
  //     return;
  //   }

  //   setCount(prev => {
  //     return prev + 1;
  //   });

  //   return () => {
  //     setCount(prev => {
  //       return prev - 1;
  //     });
  //   };
  // }, [setCount, visible]);

  return null;
}
