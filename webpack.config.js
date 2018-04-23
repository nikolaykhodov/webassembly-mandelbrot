const CopyWebpackPlugin = require('copy-webpack-plugin');

// build settings
module.exports = {
    mode: 'development',
    
    entry: {
        'mandelbrot-es6': [
            './src/mandelbrot-es6.js'
        ],

        'mandelbrot-wasm': [
            './src/mandelbrot-wasm.js'
        ]
    },

    resolve: {
        extensions: [
        '.js'
        ]
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
       ]
    },

    plugins: [
        new CopyWebpackPlugin([
                {
                    context: 'src/',
                    from: '**/*.html',
                    to: './'
                },
                {
                    context: 'src/',
                    from: '**/*.wasm',
                    to: './'
                }
            ], {
                // By default, we only copy modified files during
                // a watch or webpack-dev-server build. Setting this
                // to `true` copies all files.
                copyUnmodified: true
            }
        )
    ]
};