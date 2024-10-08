const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const project_root = path.resolve('./');

module.exports = (env, argv) => {
    const watchMode = argv.liveReload || false
    const modeEnv = argv.mode || 'development'
    const isProd = modeEnv === 'production'

    const optimizations = {
        splitChunks: { // Чанки для нашего приложения. Все наши npm-пакеты вынесем в отдельный файл с определенным хешем, чтобы клиент каждый раз при изменениях не выкачивал все по-новой
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        minimizer: [],
    }

    if (isProd) {
        optimizations.minimizer.push(new UglifyJsPlugin())
    }

    return {
        devServer: {
            static: path.join(__dirname, "public"),
            compress: true,
            port: 3000,
            // watchContentBase: true,
            // progress: true,
            hot: true,
            open: true,
            historyApiFallback: true, // Не забудьте про этот параметр, ибо со значением false WDS будет «прямолинейно» обрабатывать ссылки для React Router'а. Т.е. он будет по путь->директория искать index.html, а он у нас один и в корне.
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        "ts-loader",
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader",
                    ],

                },
                {
                    test: /\.sass$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],

                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                }
            ],
        },
        resolve : {
            extensions: [
                '.ts',
                '.tsx',
                '.js',
                '.jsx',
            ],
            alias: {
                src: path.resolve(project_root, 'src'),
            },
            modules: [
                path.resolve(project_root, 'src'),
                path.resolve(project_root, 'node_modules'),
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html', // Скармливаем наш HTML-темплейт
            }),
            new WebpackNotifierPlugin({ alwaysNotify: false }),
        ],
        entry: {
            main: './src/index.js',
        },
        output: {
            filename: watchMode ? 'assets/[name].[hash].js' : 'assets/[name].[chunkhash].js', // небольшое условие, т.к. WDS не будет работать с chunkhash
            path: path.resolve(__dirname, 'dist'), // Весь наш результат складываем в папку dist
            publicPath: '/',
        },
        performance: {
            hints: false,
        },
        optimization: optimizations,
    }
}
