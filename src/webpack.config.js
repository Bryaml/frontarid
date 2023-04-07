const path = require('path');

module.exports = {
  mode: 'development', // o 'production', dependiendo de tu entorno
  entry: './src/index.js', // ruta de tu archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // ruta de salida, ajusta según sea necesario
    filename: 'bundle.js', // nombre del archivo de salida
  },
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      buffer: require.resolve('buffer/'),
    },
  },
};
