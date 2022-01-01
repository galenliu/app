const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware(
            {
                target: 'http://192.168.1.106:9090',
                changeOrigin: true,
                pathRewrite: {"^api": ""}
            }
        ));
    app.use(
        '/api',
        createProxyMiddleware(
            {
                target: 'ws://192.168.1.106:9090',
                changeOrigin: true,
                ws: true,
                pathRewrite: {"^api": ""}
            }
        ));
};
