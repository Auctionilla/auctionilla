module.exports = {

  context: __dirname,
  entry: {
    main: './main/index'
  },

  output: {
    path: 'public/client',
    filename: '[name].js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      // All files with a '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx$/, loader: 'ts-loader' }
    ]
  }
};
