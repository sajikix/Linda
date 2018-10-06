module.exports = {
  mode: "development",
  entry: {
    tupleSpace: "./src/pages/tupleSpace.tsx",
    home: "./src/pages/home.tsx",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/public/js/pages",
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
};
