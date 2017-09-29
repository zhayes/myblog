const path = require("path");

const webpack = require('webpack');

module.exports ={
    entry:{
        'index':['./src/index.js'],
        'jquery-1.8.3':['./src/jquery-1.8.3'],
        'wangEditor':['./src/wangEditor']
    },
    output:{
        path:path.resolve(__dirname,'dist/public/js'),//绝对路径
        filename:'[name].js',
        publicPath:"/dist/public"
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude:'/node_modules',
                use:['babel-loader?presets[]=es2015']
            },
            {
                test: /\.css$/,
                use:["style-loader","css-loader?minimize"]
            },
            {
                test:/\.(png|jpg|svg|jpeg|gif|bmp)/,
                use:['file-loader?limit=10&name=/dist/public/img/[hash].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            warning: false
        }),
    ],
} 
