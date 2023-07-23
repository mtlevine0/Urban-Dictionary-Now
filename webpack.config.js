const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = {
  // The entry point file described above
  entry: [
    './src/js/firebase_config.js',
    './src/js/main.js'
    ],
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
    }),
    new CopyWebpackPlugin([{
        from: "src/manifest.json",
    }, 
    {
        from: "src/img"
    }])
  ]
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
//   devtool: 'eval-source-map',
};
