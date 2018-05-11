const PATH = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/components/app.jsx',
    output: {
        path: __dirname,
        filename: 'public/bundle.js'
    },
    resolve: {
        modules: [
            __dirname, 'node_modules'
        ],
        alias: {
            //components
            wrapper: 'app/components/common/wrapper.jsx'
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};