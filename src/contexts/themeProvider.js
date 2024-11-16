import { createTheme, ThemeProvider } from '@mui/material/styles';
//#741A2C
const theme = createTheme({
  palette: {
    primary: {
      main: "#406F77",
    },
    secondary: {
      main: '#E28065',
    },
  },
  typography: {  
    fontFamily: 'Arial',
    h1: {
        fontSize: '3rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    h2: {
        fontSize: '1.7rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    body1: {
      fontSize: '1rem',
      padding: '1px',
    }
  },
  breakpoints: {
    values: {
      xs: 0,    // extra malé zařízení
      sm: 500,  // malé zařízení
      md: 800,  // střední zařízení
      lg: 1280, // velké zařízení
      xl: 1920, // extra velké zařízení
    },
  },
});

export default function CustomThemeProvider({ children }) {
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }