var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//webpack基础配置
//配置了这个之后打包只需要在终端运行webpack就可以了
module.exports = {

    //配置生成Source Maps，选择合适的选项
    devtool: 'eval-source-map',

    //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        //出口
        path: __dirname + "/dlist",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },

    //配置loader
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader?modules', 'css-loader?modules', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ]
            }
        ]
    },

    // //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),    //热加载插件
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ],


    //配置本地服务器
    devServer: {
        contentBase: "./dlist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
    }

}