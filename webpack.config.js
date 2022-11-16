const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',

  // Configures which files webpack should look at to bundle
  entry: {
    index: './src/index.js',
  },

  // Configures the shape and condition of output files and directory
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  
  // Allows source maps and debugging
  devtool: 'inline-source-map',
  
  // config for webpack-dev-server
  devServer: {
    static: { 
      directory: path.resolve(__dirname, './src/assets'), 
      publicPath: '/assets'
    }
  },

  // plugins to run against files, assets, fonts etc
  plugins: [
    // Creates a html file in the dist folder
    new HtmlWebpackPlugin({
      title: 'Shooter Game',
    }),

    new CopyPlugin({
      patterns: [
        { from: "assets/**/*", to: "", context: "src" },
      ],
    }),
  ],

  // Rules to tell webpack what custom or built-in loaders to run against what file types
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
  },
};