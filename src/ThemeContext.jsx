import { createContext, useContext, useReducer } from "react";

const defaultTheme = { darkTheme: false, fontSize: 0 };

const ThemeContext = createContext(null);
const ThemeDispatchContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, defaultTheme);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}

export function themeReducer(theme, action) {
  const fontRange = [-1, 1];

  switch (action.type) {
    case "switch": {
      return {
        ...theme,
        darkTheme: action.darkTheme,
      };
    }
    case "increase": {
      return {
        ...theme,
        fontSize:
          theme.fontSize <= fontRange[1] ? action.fontSize : theme.fontSize,
      };
    }
    case "decrease": {
      return {
        ...theme,
        fontSize:
          theme.fontSize >= fontRange[0] ? action.fontSize : theme.fontSize,
      };
    }
    default: {
      throw Error("Unknown action:" + action.type);
    }
  }
}
