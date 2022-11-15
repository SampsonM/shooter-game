const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  // Configures which files webpack should look at to bundle
  entry: {
    index: './src/index.js',
    game: './src/services/Game.js'
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
    static: './dist',
  },

  // plugins to run against files, assets, fonts etc
  plugins: [
    // Creates a html file in the dist folder
    new HtmlWebpackPlugin({
      title: 'Shooter Game',
    }),
  ],

  // Rules to tell webpack what custom or built-in loaders to run against what file types
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
  },
};