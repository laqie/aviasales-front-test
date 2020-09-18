module.exports = {
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      ['babel-plugin-styled-components', { ssr: false }],
    ],
  },
};
