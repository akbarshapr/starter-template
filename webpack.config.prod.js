'use strict';

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "[name]-[contenthash].bundle.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/app/templates/template.html", minify: false }),
        new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[folder]/[name].[ext]",
                        outputPath: "static"
                    }
                }
            }
        ]
    }
}
