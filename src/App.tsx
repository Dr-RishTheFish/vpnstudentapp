import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import VpnDashboard from './components/VpnDashboard';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VpnDashboard />
    </ThemeProvider>
  );
};

export default App;