"use strict";
require('babel-register')({
    presets: ['es2015', 'stage-0']
});
require("babel-polyfill");

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const recursive = require('recursive-readdir');
const PAGE_PATH = path.resolve('./templates/');
const JS_PATH = path.resolve('./javascript/');

let baseWebpackConfig = {
    resolve: {
        alias: {
            js: path.resolve('./javascript/'),
            common: path.resolve('./javascript/common/'),
            mcss: path.resolve('./mcss/'),
            img: path.resolve('./img/'),
            component: path.resolve('./javascript/component/'),
            dep: path.resolve('./node_modules/')
        }
    },
    entry: {
        lodash: 'lodash',
        'nek-ui': 'nek-ui',
        venderB: path.resolve('javascript/component/b.js')
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascript/[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },
    externals: {
        // 'nek-ui': 'NEKUI',
        // Regular: 'Regular'
    },
    module: {
        rules: [{
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            loader: 'file-loader'
        }, {
            test: /\.png$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]',
                    limit: 10000,
                    mimetype: 'image/png'
                }
            }
        }, {
            test: /\.jpe$|\.jpg$|\.jpeg/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]',
                    limit: 10000,
                    mimetype: 'image/jpeg'
                }
            }
        }, {
            test: /\.gif$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]',
                    limit: 10000,
                    mimetype: 'image/gif'
                }
            }
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.m?css$/,
            use: ExtractTextPlugin.extract(['css-loader', 'mcss-loader'])
        }]
    },
    plugins: [
        new ExtractTextPlugin("stylesheet/[name].css")
    ]
};

function isPageFtl(filePath) {
    return filePath.startsWith(['templates', 'page', ''].join(path.sep));
}

const generateWebpackConfig = (files, baseWebpackConfig) => {
    let files2Move = [];
    files.forEach(file => {
        let filename = path.relative(__dirname, file);
        if (isPageFtl(filename)) {
            let keyPath = file.replace(PAGE_PATH, '')
            .replace(/\\/g, '/')
            .replace(/\.ftl$/, '')
            .slice(1);
            let key = keyPath.replace(path.sep, '.');
            baseWebpackConfig.entry[key] = path.resolve(path.resolve(JS_PATH, keyPath)) + '.js';
            baseWebpackConfig.plugins.push(new HtmlWebpackPlugin({
                chunks: ['common', 'lodash', 'venderB', key, 'main', 'nek-ui'], //CommonChunkPlugin中的main
                template: file,
                filename: filename
            }));
        } else {
            files2Move.push({
                from: path.resolve(filename),
                to: path.resolve('dist/', filename)
            });
        }
    });

    baseWebpackConfig.plugins.push(new CopyWebpackPlugin(files2Move));

    baseWebpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        names: ['common', 'main'], //main是webpack启动的脚本, 有个其他文件都要用的jsonp方法在此声明
        minChunks: 10
    }));

    console.log(JSON.stringify(baseWebpackConfig))
    return baseWebpackConfig;
};

module.exports = new Promise((resolve, reject) => {
    recursive(PAGE_PATH, (err, files) => {
        // Files is an array of filename
        let filerFilesFunc = file => /\.ftl$/.test(file);

        if (err) {
            console.log(err);
            return;
        }
        files = files.filter(filerFilesFunc);
        resolve(generateWebpackConfig(files, baseWebpackConfig));
    });
});
