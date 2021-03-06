const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development', // 0. Estableciendo que esto es para desarrollo
  // 1. Especificamos el archivo de entrada
  entry: './client/index.js',
  // 2. Especificando el archivo de salida
  output: {
    path: path.join(__dirname, 'public'), // 3. Ruta absoluta de la salida
    filename: 'js/bundle.js', // 4. Nombre del archivo de salida
    publicPath: '/' //5. path publico
  },
  devServer: {
    contentBase: path.join(__dirname,'public'),
    port: 3000,
    host: 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'modules': false,//commonjs,amd,umd,systemjs,auto
                    'useBuiltIns': 'usage',
                    'targets': {"chrome": "80"},
                    'corejs': 3
                  }
                ]
              ],
              "plugins": [
                [
                  "module-resolver",
                  {
                    "root": ["./"],
                    "alias":{
                      "@client" : "./client",
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'styles/app.css',}),
    new ESLintPlugin()
  ],
}
