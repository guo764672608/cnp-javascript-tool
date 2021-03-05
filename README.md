# cnp-javascript-tool
日常开发过程中使用到的javascript工具，方便跨项目代码服用

//  css、style
npm install css-loader post-loader style-loader --save-dev 

// 安装sass-loader
npm install node-sass sass-loader -D 

// 安装less-loader
npm install less less-loader --save-dev 

// style-loader 会把之前css-loader解析的css内容挂载到head部分得style标签中
// css-loader	会分析不同css文件之间的依赖关系并合并成一个css文件
// postcss-loader	可以帮助我们自动给那些可以添加厂商前缀的样式添加厂商前缀-webkit -moz -ms -o
// less-loader	把less文件里面样式转化成css样式
// mini-css-extract-plugin 分离css
// optimize-css-assets-webpack-plugin
// ptimize-css-assets-webpack-plugin CSS压缩去重
// terser-webpack-plugin 
// postcss-safe-parser


// html-webpack-plugin 会在打包之后自动生成一个html文件，并且自动插入打包后的js文件，可以选择性的配置模板文件
// clean-webpack-plugin 会在打包之前自动清除上一次的打包结果，不用手动再去删除
// webpackbar 打包的时候控制台的打包进度条



























