const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ZipPlugin = require('zip-webpack-plugin');
const { name, version } = require('../package.json');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new ZipPlugin({
            filename: `${name}_${version}.zip`,
        }),
    ]
});
