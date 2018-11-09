var path = require('path');
var HtmlwebpackPlugin = require ('html-webpack-plugin');
module.exports={
    // entry: có thể cho nhiều file
    entry:{
       index: './src/app/controller/index.ts',
       cart:'./src/app/controller/cart.ts'
    },
    devtool:'source-map',
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'js/[name].js',
    },
    resolve:{
        extensions:['.ts','.js']
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.ts$/,
                use:['ts-loader']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(png|jpg|svg)$/,
                use:[{
                    loader:"file-loader",
                    options:{
                        limit:10000,
                        name:'[name].[ext]',
                        outputPath:"img/",
                        publicPath:"img/",
                        // limit:2000000
                    }
                }]
            },
            {
                test:/\.scss$/,
                loader:['style-loader','css-loader','sass-loader']
            }
        ]
    },

    plugins:[
        new HtmlwebpackPlugin({
            filename:'index.html',
            template:'./src/app/Views/index.html',
            chunks:['index'],
        }),
        new HtmlwebpackPlugin({
            filename:'cart.html',
            template:'./src/app/Views/cart.html',
            chunks:['cart'],
        })
    ],
    devServer:{
        contentBase:'./dist'
    }
}