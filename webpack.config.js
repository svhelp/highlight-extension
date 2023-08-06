const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      content: path.resolve(__dirname, "src", "content-script", "app.ts"),
      popup: path.resolve(__dirname, "src", "popup-script", "app.tsx"),
   },
   output: {
      path: path.join(__dirname, "./dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".tsx", ".jsx", ".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
   ],
};