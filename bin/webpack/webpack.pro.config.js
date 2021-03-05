const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const webpackbar = require('webpackbar');

const paths = require('./paths');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

const isEnvProduction = process.env.NODE_ENV === 'production';

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: paths.publicUrlOrPath.startsWith('.') ? { publicPath: '../../' } : {},
        },
        {
            loader: require.resolve('css-loader'),
            options: { ...cssOptions, }
        },
        {
            loader: require.resolve('postcss-loader'),
        }
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve(preProcessor),
            }
        );
    }
    return loaders;
};


module.exports = {
    mode: "production",
    // 入口文件
    entry: [
        paths.appIndexJs,
    ].filter(Boolean),
    output: {
        path: isEnvProduction ? paths.appBuild : undefined,
        filename: 'index.js',
        globalObject: 'this',
    },
    optimization: {
        minimize: isEnvProduction,
        minimizer: [
            new TerserJSPlugin({
                test: /\.js(\?.*)?$/i,
            }),    // js压缩可配置
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap ? { inline: false, annotation: true, } : false,
                },
                cssProcessorPluginOptions: {
                    preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                },
            }), // css压缩可配置
        ]
    },
    module: {
        // 配置相应的规则
        rules: [
            { parser: { requireEnsure: false } },
            {
                oneOf: [
                    // 图片资源
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: imageInlineSizeLimit,
                            name: 'src/img/[name].[ext]',
                            outputPath: './src/img', //指定放置目标文件的文件系统路径
                        },
                    },
                    // jsx|ts 文件资源
                    {
                        test: /\.(ts|tsx)$/,
                        include: paths.appSrc,
                        exclude: /node_modules/,
                        use: ["ts-loader"]
                    },
                    // js 文件资源
                    {
                        test: /\.(js|mjs|jsx)$/,
                        include: paths.appSrc,
                        exclude: /node_modules/,
                        use: ["babel-loader"]
                    },
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: getStyleLoaders({ importLoaders: 1, sourceMap: isEnvProduction && shouldUseSourceMap, }),
                        sideEffects: true,
                    },
                    {
                        test: cssModuleRegex,
                        use: getStyleLoaders({ importLoaders: 1, sourceMap: isEnvProduction && shouldUseSourceMap }),
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: getStyleLoaders({ importLoaders: 1, sourceMap: isEnvProduction && shouldUseSourceMap, }, 'sass-loader'),
                        sideEffects: true,
                    },
                    {
                        test: sassModuleRegex,
                        use: getStyleLoaders({ importLoaders: 3, sourceMap: isEnvProduction && shouldUseSourceMap }, 'sass-loader'),
                    },
                    {
                        test: lessRegex,
                        exclude: lessModuleRegex,
                        use: getStyleLoaders({ importLoaders: 3, sourceMap: isEnvProduction && shouldUseSourceMap, }, 'less-loader'),
                    },
                    {
                        test: lessModuleRegex,
                        use: getStyleLoaders({ importLoaders: 3, sourceMap: isEnvProduction && shouldUseSourceMap, }, 'less-loader'),
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: { name: 'src/file/[name].[ext]', },
                    },
                ]
            }
        ]
    },
    // 配置相应的插件
    plugins: [
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     template: paths.appHtml,
        //     filename: 'index.html',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeRedundantAttributes: true,
        //         useShortDoctype: true,
        //         removeEmptyAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         keepClosingSlash: true,
        //         minifyJS: true,
        //         minifyCSS: true,
        //         minifyURLs: true,
        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: 'src/css/[name].css',
            chunkFilename: 'src/css/[name].css',
        }),
        new CleanWebpackPlugin(),
        new webpackbar({ color: 'purple' }),
        // new BundleAnalyzerPlugin() // 包大小等信息分析
    ]
};
