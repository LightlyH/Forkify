const path = require('path'); // include the built-in Node package called path
const HtmlWebpackPlugin = require('html-webpack-plugin');

// export the configuration obj
module.exports = { // Node.js export syntax
    entry: ['babel-polyfill', './src/js/index.js'], // webpack will bundle the two together into one file
    output: {
        path: path.resolve(__dirname, 'dist'), // need absolute path; __dirname is the current absolute path
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist' // folder from which webpack should serve our files
    },
    plugins: [
        new HtmlWebpackPlugin({ // pass options using obj
            filename: 'index.html', // final and ready-to-go-production html file
            template: './src/index.html' // starting html file (source)
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // look for all the files and test if they end in .js. if it ends, it will apply the babel loader
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
    
};










