/**
 * Created by jeremyliu on 3/30/16.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app:path.join(__dirname, 'src'),
        vendors: ['react']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel',
                query:{
                    presets:['react','es2015']
                }
            },
            {
                test:/\.css?$/,
                loader:ExtractTextPlugin.extract("style", "css?-url")
            },
            {
                test: /\.png|jpg|gif?$/,
                loader: "file-loader?name=[path][name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("styles.css")
    ]
};
