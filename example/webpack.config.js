const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
    entry: path.resolve(__dirname, 'index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{loader:'eslint-loader', options:{}}]
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{loader:'babel-loader', options:{}}]
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: false

                    }
                }, {
                    loader: 'sass-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [autoprefixer('last 2 versions', 'ie 10')]
                        }
                    }
                }]
            })
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [{
                loader: 'url-loader',
                /* options: {
                    outputPath: './images/',
                    limit: 100
                } */
            }]

        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                /* options: {
                    outputPath: './fonts/'
                } */
            }]
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            favicon: "",
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'index.html'),
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