const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    publicPrefix: isProd ? '/gpc-next' : ''
  },
  basePath: isProd ? '/gpc-next' : '',
  assetPrefix: isProd ? '/gpc-next/' : '',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles', 'legacy')]
  }
};
