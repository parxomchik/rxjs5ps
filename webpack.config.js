module.exports = {
    entry: "./main",
    output: { filename: 'app.js'},
    module: {
        rules: [
            {
                test: /.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".ts", ".js"]
    }
}