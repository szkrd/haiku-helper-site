module.exports = {
  entry: './client/js/app.js',
  output: {
    path: './client/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
}
