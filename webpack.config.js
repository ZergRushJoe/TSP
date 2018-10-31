const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    mode: "development",
    output: {
        path: path.resolve(__dirname,"./bin"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?modules!sass-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname,"./bin")
    }
};