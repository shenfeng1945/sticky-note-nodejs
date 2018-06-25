var webpack = require('webpack')
//内置，方便把url组装在一起
var path = require('path')

module.exports = {
    entry: path.join(__dirname, 'js/app/index.js'),//不管在什么路径下，都能找到该文件
    output: {
        path: path.join(__dirname, '../public/js'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.less$/,//当检测到less后缀时
            //loader用于解析require里的内容
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    resolve: {
        alias: {
        //如果require以jquery开头，则去找这个文件,默认情况首先在node_modules里找，由于加了这个，则直接去写的目录下去找了。
            jquery: path.join(__dirname, 'js/lib/jquery.min.js'),
            mod: path.join(__dirname, 'js/mod'),
            less: path.join(__dirname, 'less')
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
        //把jquery这个模块提供到所有的模块里。
            $:'jquery'
        }),
    ]
}