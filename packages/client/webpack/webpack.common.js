const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const webpack = require('webpack');

module.exports = (env, options) => {
    const { mode } = options;

    const isDevelopment = mode !== 'production';

    return {
        entry: './src/index.tsx',
        target: 'web',
        output: {
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            babelrc: false,
                            presets: [
                                '@babel/preset-typescript',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                isDevelopment &&
                                    require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
                    },
                },
                {
                    test: /\.(css)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true, importLoaders: 1 },
                        },
                        'resolve-url-loader',
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg|pdf|jpg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                                esModule: false,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(process.env.BUILD_NUMBER),
            }),
            new webpack.HotModuleReplacementPlugin(),
            isDevelopment &&
                new ReactRefreshWebpackPlugin({
                    overlay: {
                        sockProtocol: 'wss',
                        sockHost: 'localhost',
                    },
                    exclude: [/node_modules/],
                }),
        ].filter(Boolean),
    };
};
