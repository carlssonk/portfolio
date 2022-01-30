const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/js/app.js",
    vendor: "./src/js/vendor.js"
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets", to: "assets"
        }
      ]

    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif|mp4)$/,
        type: "asset/resource"
      },
    ]
  }
};