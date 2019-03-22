

import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, blue } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
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