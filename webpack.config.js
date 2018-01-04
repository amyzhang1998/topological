var path = require("path");

module.exports = {
    context: path.resolve(__dirname, "./"),
    entry: "./app.js",
    output: {
        filename: "boundle.js"
    },
    devServer: {
        port: 7000
    }
};
