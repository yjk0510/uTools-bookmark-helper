// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV == 'production'
const config = {
  entry: './src/index.dev.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'setting.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
    },
    fallback: {
      fs: false,
    },
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}
