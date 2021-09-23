const path = require('path');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack/webpack.common.js');

const initAppVars = require('./webpack/initAppVars');

module.exports = (env, options) => {
    const { mode } = options;

    const isDevelopment = mode !== 'production';

    const appVars = initAppVars(mode, process.env.branchname);

    return merge(common(env, options), {
        mode,
        devtool: isDevelopment ? 'eval-source-map' : false,
        output: {
            publicPath: isDevelopment ? 'https://localhost:3000/' : 'auto',
        },
        devServer: {
            allowedHosts: 'all',
            historyApiFallback: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
            static: {
                directory: path.join(__dirname, 'dist'),
                publicPath: './dist/',
            },
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
            hot: true,
            port: 3000,
            https: true,
            open: true,
        },
        resolve: {
            alias: {
                '@axios': path.join(__dirname, 'src/axios'),
                '@components': path.join(__dirname, 'src/components'),
                '@models': path.join(__dirname, 'src/models'),
                '@hooks': path.join(__dirname, 'src/hooks'),
                '@utils': path.join(__dirname, 'src/utils'),
                '@context': path.join(__dirname, 'src/context'),
            },
        },
        plugins: [
            new Dotenv({
                path: path.join(__dirname, `.env.${appVars.tier}`),
            }),
        ],
    });
};
