const path = require("path");

module.exports = {
  target: "web",
  entry: {
    app: ["./src/public/js/search.main.js"],
  },
  output: {
    path: path.resolve(__dirname, "./src/public/js"),
    filename: "search.bundled.js",
  },
  devtool: "inline-source-map",
};
