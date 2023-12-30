import {createTheme, PaletteColorOptions, PaletteColor} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    first?: PaletteColorOptions;
    second?: PaletteColorOptions;
    third?: PaletteColorOptions;
  }

  interface Palette {
    first: PaletteColor;
    second: PaletteColor;
    third: PaletteColor;
  }

  interface ButtonPropsColorOverrides {
    first: true;
    second: true;
    third: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    first: true;
    second: true;
    third: true;
  }
}

const globalTheme = createTheme({
  palette: {
    first: {
      main: '#f6f8fa', // header
      dark: '#020409',
    },
    second: {
      main: '#ffffff', // bg
      dark: '#0e1116',
    },
    third: {
      main: '#25282e', // color
      dark: '#e7edf2',
    },
  },
});

export const theme = createTheme({
  palette: {
    first: {
      main: globalTheme.palette.first.main,
      dark: globalTheme.palette.first.dark,
    },
    second: {
      main: globalTheme.palette.second.main,
      dark: globalTheme.palette.second.dark,
    },
    third: {
      main: globalTheme.palette.third.main,
      dark: globalTheme.palette.third.dark,
    },
  },
  // typography: {
  //   allVariants: {
  //     color: globalTheme.palette.third.main,
  //   },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '54px',
          padding: '25px',
          borderRadius: 0,
          color: globalTheme.palette.third.main,
          fontWeight: 400,
          fontSize: '1.125rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'trasparent',
            // color: 'inherit',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // maxWidth: '1400px',
          boxShadow: 'none',
          position: 'sticky',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 !important',
          display: 'flex',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1448px',
        },
      },
    },
  },
});
