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
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'js/lib/jquery.min.js'),
            mod: path.join(__dirname, 'js/mod'),
            less: path.join(__dirname, 'less')
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
    ]
}