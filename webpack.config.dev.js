var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');
var webpack           = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    path.join(__dirname, 'src', 'index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
        { from: 'node_modules/pixi.js/dist' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules')
        ],
        loader: 'file-loader',
        query: {
          name: 'static/[name].[hash:8].[ext]'
        }
      },
      // "html" loader is used to process template page (index.html) to resolve
      // resources linked with <link href="./relative/path"> HTML tags.
      {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          attrs: ['link:href'],
        }
      }
    ]
  },
};
