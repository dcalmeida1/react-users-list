import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: '5px',
      },
    },
    MuiTextField: {
      root: {
        margin: '5px',
      },
    },
    MuiGrid: {
      root: {
        alignItems: 'center',
      },
    },
    MuiCardContent: {
      root: {
        padding: '10px 20px !important',
      },
    },
  },
});

export default theme;
