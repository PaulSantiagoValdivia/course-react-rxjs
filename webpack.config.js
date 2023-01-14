const path = require("path");
module.exports = {
  devtool: "eval-cheap-source-map",
  entry: "./src/index.js",
  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  mode:'development'
};
