const theme = {
  font: {
    size: {
      default: '13px',
      small: '12px',
      medium: '14px',
      large: '24px',
    },
    family: '\'Open Sans\', sans-serif',
  },
  colors: {
    white: '#fff',
    gray: '#DFE5EC',
    text: '#4A4A4A',
    textMuted: '#A0B0B9',
    blue: '#2196F3',
    paleBlue: '#F1FCFF',
    lightBlue: '#F3F7FA',
  },
  spacing: {
    xSmall: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    huge: '48px',
    xLarge: '48px',
  },
};

export type Theme = typeof theme;
export type Color = keyof Theme['colors'];

export default theme;
