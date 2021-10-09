const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware(
            {
                target: 'http://localhost:9090',
                changeOrigin: true,
                pathRewrite: {"^api": ""}
            }
        ));
    app.use(
        '/api',
        createProxyMiddleware(
            {
                target: 'ws://localhost:9090',
                changeOrigin: true,
                ws: true,
                pathRewrite: {"^api": ""}
            }
        ));
};