var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_module_dir = path.join(__dirname, 'node_modules');

var config = {
  addVendor: function(name, path) {
    this.resolve.alias[name] = path;
   // this.module.noParse.push(new RegExp(path));
  },
  resolve: {
    alias: {}
  },
  entry: {
    app: './modules/main.js',
    vendor: ['react', 'react-router', 'bootstrap.css'], // is this the best way to seprate vendor css
  },
  output: {
    path: './build',
    publicPath: 'http://test.com/',  //how to use publicPath?
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: 'jsx?harmony' },//same as jsx-loader?harmony
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },//same as style-loader!css-loader
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "raw-loader" }, 
      { test: /\.woff2$/, loader: "raw-loader" }, 
      { test: /fonts\/.+\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "raw-loader" },
      { test: /icon-.+\.(svg)$/, loader: 'raw-loader' }
    ]
  },
  externals: {
    react: 'React'   //is this best way to use React as externals?
  }
};

config.addVendor('bootstrap.css', path.join(bower_dir, 'bootstrap', 'dist','css','bootstrap.css'));
//config.addVendor('react', path.join(bower_dir, 'react', 'react.js'));
//config.addVendor('react-router', path.join(bower_dir, 'react-router', 'build', 'umd', 'ReactRouter.js'));

module.exports = config;

//how to use hash?
