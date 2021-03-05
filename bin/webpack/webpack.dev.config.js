const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
    mode: "development",
    // 入口文件
    entry: [
        paths.appIndexJs,
    ],
    devtool: "source-map", // 设置之后在Chrome中调试代码时将现实编译前的文件
    output: {
        publicPath: paths.publicUrlOrPath,
    },
    module: {
        rules: [
            { test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/], use: ['url-loader'] },
            { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
            { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
            { test: /\.less/, use: ["style-loader", "css-loader", "less-loader"] }
        ]
    },
    resolve: {
        extensions: ['.js', ".tsx", '.ts', '.json']
    },
    // 配置相应的插件
    plugins: [
        new HtmlWebpackPlugin({ inject: true, template: paths.appHtml }),
    ],
    devServer: {
        contentBase: paths.appDevBuild,
        host: "h5client.admin.ymatou.cn",
        port: "8082",
        progress: true,
        open: true,
        openPage: paths.publicUrlOrPath.substr(1) + '#/sellerMedal/list',
        proxy: {
            "/h5client/oms/": {
                target: 'http://h5server.admin.ymatou.cn/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/h5client/oms': 'oms' //重写路径
                }
            },
            "/h5client/oms/": {
                target: 'http://h5server.admin.ymatou.cn/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/h5client/adminGateWay': 'adminGateWay' //重写路径
                }
            },
            // 链接服务器本地调试
            // "/h5client/oms/": {
            //     target: 'http://172.17.13.241:3000',
            //     changeOrigin: true,
            //     secure: false,
            //     pathRewrite: {
            //         '^/h5client/oms': 'oms' //重写路径
            //     }
            // },
        }
    }
};
