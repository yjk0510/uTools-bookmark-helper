// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'setting.js',
    library: {
      type: 'commonjs',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  targets: { node: 12 },
                  corejs: {
                    version: '3.22',
                  },
                },
              ],
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
          },
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
    fallback: {
      fs: false,
    },
  },
  // plugins: [new BundleAnalyzerPlugin()],
  target: 'node',
}
