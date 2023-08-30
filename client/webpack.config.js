const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      //the main js file of the js bundle that'll be created
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js'
    },
    output: {
      //the name of the js bundle that'll be created
      filename: '[name].bundle.js',
      //the file path of where the distribution directory will be created
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    //minified versions of html documents will be added to the dist folder. 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
      }),
      //a service worker will be generated within the dist folder according to the blueprints detailed within the src-sw.js file
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //The application will be turned into a PWA
      new WebpackPwaManifest({
        fingerprints: false,
        // inject: true,
        name: 'J.A.T.E.',
        short_name: 'J.A.T.E.',
        description: 'Just another text editor!',
        start_url: './',
        publicPath: './',
        icons: [{
          src: path.resolve('./src/images/logo.png'),
          //different sized versions of the logo will be added to the dist folder. 
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        }],
      }),
    ],

    module: {
      rules: [
        {
          //Webpack will recognize .css files and use the MiniCssExtractPlugin to load it's content
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //Webpack will recognize image files and assign them type values of 'asset/resource'
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          //Webpack will recognize js files, excluding node_modules and bower_components, and will use babel-loader
          //to load it's content. 
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};
