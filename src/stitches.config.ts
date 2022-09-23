import { createStitches, PropertyValue } from '@stitches/react';
import { blue, blueDark, slate, slateDark, yellow } from '@radix-ui/colors';


export const {
  styled,
  globalCss,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      bodyBg: '#f3f7fa',
      text: '#4A4A4A',
      textMuted: slate.slate9,
      cardBg: '#fff',
      filterHover: blue.blue3,
      accent: blue.blue9,
      border: slate.slate6,
      skeleton: slate.slate4,
      toggleButton: slate.slate5,
      toggleButtonHover: slate.slate3,
      toggleButtonIcon: blue.blue10,
    },
    shadows: {
      card: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    sizes: {
      header: '156px',
      footer: '80px',
    },
    fonts: {
      default: `'Open Sans', sans-serif`,
    },
    fontSizes: {
      sm: '12px',
      md: '13px',
      lg: '14px',
      xl: '24px',
    },
    space: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '48px',
    },
    radii: {
      xs: '3px',
      sm: '5px',
      round: '50%',
    },
  },
  media: {
    md: '(min-width: 768px)',
  },
  utils: {
    p: (value: PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});


export const darkTheme = createTheme({
  colors: {
    bodyBg: slateDark.slate4,
    cardBg: slateDark.slate5,
    text: slateDark.slate12,
    border: slateDark.slate4,
    textMuted: slateDark.slate11,
    skeleton: slateDark.slate4,
    filterHover: blueDark.blue3,
    toggleButton: slateDark.slate3,
    toggleButtonHover: slateDark.slate4,
    toggleButtonIcon: yellow.yellow8,
  },
});
