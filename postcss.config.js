const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        importFrom: ['./src/styles/variables.css'],
        features: {
          'custom-properties': true,
          'custom-media-queries': true,
          'nesting-rules': true
        }
      }
    ],
    [
      'postcss-url',
      {
        // note `rebase` option doesn't work so we use `url`
        url: function ({ url }) {
          return isProd ? `/gpc-next${url}` : url;
        }
      }
    ]
  ]
};
