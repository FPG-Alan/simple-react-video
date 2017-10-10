const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
    entry: './index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{loader:'eslint-loader', options:{eslintPath: "../eslintrc.js"}}]
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{loader:'babel-loader', options:{extends: "../babelrc.js"}}]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "",
            filename: "./dist/index.html",
            template: "./index.html",
            inject: true,
            hash: true,
            minify: {
                removeCommits: true,
                collapseWhitespace: false
            }
        })
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //         // NODE_ENV: JSON.stringify('development')
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({

        // })
    ]
};

module.exports = config;