const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TesrserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
    const isDev = () => argv.mode === "development";

    const entry = {
        index: "./src/index.js",
        generateur: "./generateur/generateur.js",
    };

    const output = {
        path: path.resolve(__dirname, "build"),
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[name].bundle.js",
    };

    const devServer = {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
        open: true,
    };

    const optimization = {
        minimizer: [
            new TesrserPlugin({ sourceMap: true }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
                    name: "react",
                    chunks: "all",
                },
                commons: {
                    test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
                    name: "common",
                    chunks: "all",
                },
            },
        },
    };

    const devtool = isDev() ? "cheap-module-source-map" : "source-map";

    const module = {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                [
                                    "@babel/preset-react",
                                    { development: isDev() },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer()],
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                loader: "file-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            fallback: "file-loader",
                            name: "img/[folder]/[name].bundle.[ext]",
                        },
                    },
                    {
                        loader: "img-loader",
                        options: {
                            enabled: !isDev(),
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                    },
                ],
            },
            {
                test: require.resolve("jquery"),
                use: [
                    {
                        loader: "expose-loader",
                        options: "jQuery",
                    },
                    {
                        loader: "expose-loader",
                        options: "$",
                    },
                ],
            },
        ],
    };

    const plugins = [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: "css/[name].bundle.css",
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
            excludeChunks: ["generateur"],
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            defaultSizes: "gzip",
            analyzerMode: "static",
            reportFilename: "../report.html",
        }),
    ];

    return {
        entry,
        output,
        devServer,
        optimization,
        devtool,
        module,
        plugins,
    };
};
