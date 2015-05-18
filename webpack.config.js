var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_module_dir = path.join(__dirname, 'node_modules');
var SaveAssetsJson = require('assets-webpack-plugin');

var config = {
  addVendor: function(name, path) {
    this.resolve.alias[name] = path;
//    this.module.noParse.push(new RegExp(path));
  },
  resolve: {
    alias: {}
  },
  entry: {
    app: './modules/main.js',
    vendor: ['react', 'react-router'], // is this the best way to seprate vendor css
  },
  output: {
    path: './build',
    //publicPath: 'http://test.com/',  //how to use publicPath?
    //filename: '[name]-[chunkhash].js',
    filename: '[name].js',
    sourceMapFilename: '[file].map'
    //chunkFilename: "[id].js"
  },
  devtool: 'source-map',
  debug: true,
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash].js'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    //new ExtractTextPlugin('[name]-[chunkhash].css'),
    new ExtractTextPlugin('[name].css'),
    function() {
      this.plugin("done", function(stats) {
        console.log(stats.toJson().assetsByChunkName);
      });
    }
    //new SaveAssetsJson({filename: 'assets.json'})
  ],
  module: {
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: 'jsx?harmony' },//same as jsx-loader?harmony
//      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },//same as style-loader!css-loader
      //{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=8192'  }, 
      { test: /\.woff2$/, loader: 'url-loader?limit=8192' }, 
      { test: /fonts\/.+\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=8192' },
      { test: /icon-.+\.(svg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  externals: {
    react: 'React'   //is this best way to use React as externals?
  }
};

config.addVendor('bootstrap.css', path.resolve(bower_dir, 'bootstrap/dist/css/bootstrap.css'));
//config.addVendor('react', path.join(bower_dir, 'react', 'react.js'));
//config.addVendor('react-router', path.join(bower_dir, 'react-router', 'build', 'umd', 'ReactRouter.js'));

module.exports = config;

//how to use hash?
