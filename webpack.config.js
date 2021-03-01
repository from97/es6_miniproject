const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname + '/dist'),
	filename: 'bundle.js',
	publicPath: '/dist'
  },
  module: {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}
	]
  },
};
