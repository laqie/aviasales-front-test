const theme = {
  colors: {
    gray: '#DFE5EC',
    text: '#4A4A4A',
    textMuted: '#A0B0B9',
    blue: '#2196F3',
    paleBlue: '#F1FCFF',
    lightBlue: '#F3F7FA',
  },
};

export type Theme = typeof theme;
export type Color = keyof Theme['colors'];

export default theme;
