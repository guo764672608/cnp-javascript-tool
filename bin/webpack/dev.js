'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';


const webpack = require('webpack');
const configFactory = require('./webpack.pro.config');

const config = configFactory('production');

const compiler = webpack(config);

compiler.run((err, stats) => {
    if (err) {
        console.log("build fail");
    } else {
        console.log("build success");
    }
});



