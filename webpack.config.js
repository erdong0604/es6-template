const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes:{
                            list:[
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'srcset',
                                    type: 'srcset',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-srcset',
                                    type: 'srcset',
                                },
                            ]
                        }
                    }
                }
            },
            
            { 
                test: /\.css$/, 
                use: [
                    "style-loader",
            　　 　　 "css-loader",
            　　 ]
            },
            {
                test: /\.(eot|woff|jpe?g|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            
              
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: __dirname+'/src/static',
                    to: __dirname+'/dist/static',
                    force: true,
                }
            ]
        }),
        new CleanWebpackPlugin(),
    ],
    devtool:"inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9999,
        inline: true,
        open: true,
        hot:true, //局部刷新
        overlay : true
    }
};