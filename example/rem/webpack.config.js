const path = require('path')
module.exports = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        ]
    }
}