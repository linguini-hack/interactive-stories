import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';




// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;