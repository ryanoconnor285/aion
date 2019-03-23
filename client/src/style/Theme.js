

import { createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#0091ea',
      main: '#01579b',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff5722',
      dark: '#e64a19',
      contrastText: '#000',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    useNextVariants: true,
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
});

export default theme;