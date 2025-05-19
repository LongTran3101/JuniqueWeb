import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A57A4', // This is the button color from your login image
    },
    secondary: {
      main: '#F5A623', //  Secondary color.  You can change this.
    },
    background: {
      default: '#F0F2F5', //  Background color from login
    },
    text: {
        primary: '#333',
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#fff', // White text color for buttons
                    fontWeight: 'bold',
                },
            },
        },
    },
});

export default theme;
