const { NormalModuleReplacementPlugin } = require('webpack');


module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    plugins: [
      new NormalModuleReplacementPlugin(
        /(.*)tickets\.json/,
        function(resource) {
          const shouldReplace = process.env.REACT_APP_DEBUG !== 'true' || process.env.NODE_ENV === 'production';
          if (shouldReplace) {
            resource.request = resource.request.replace(/tickets\.json/, 'ticketsEmpty.json');
          }
        },
      ),
    ],
  },
  babel: {
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          ssr: false,
          displayName: process.env.NODE_ENV === 'development',
          minify: process.env.NODE_ENV === 'production',
        },
      ],
    ],
  },
};
