'use strict';
const http = require('http');
const prom = require('prom-client');
const CO2Monitor = require('node-co2-monitor');

// Initialize prometheus metrics.
const _co2Gauge = new prom.Gauge({
    'name': 'air_co2',
    'help': 'Relative Concentration of CO2 (CntR) in ppm.',
    'labels': ['tag']
});
const _tempGauge = new prom.Gauge({
    'name': 'air_temp',
    'help': 'Ambient Temperature (Tamb) in ℃.',
    'labels': ['tag']
});

const register = new prom.Registry();
register.registerMetric(_tempGauge);
register.registerMetric(_co2Gauge);

// Setup CO2 Monitor.
const monitor = new CO2Monitor();
monitor.connect(() => {
    console.log('CO2 Monitor connected.');
    // Read CO2 monitor metrics intervally.
    setInterval(() => {
        monitor.transfer(() => {
            _tempGauge.set(monitor.temperature);
            _co2Gauge.set(monitor.co2);
        });
    }, 5000);
});

const port = 9101;

// Start Server.
const server = http.createServer((req, res) => {
    // Only allowed to poll prometheus metrics.
    if (req.method !== 'GET' && req.url !== '/metrics') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('Not Found.');
    }
    console.log(_co2Gauge);
    res.setHeader('Content-Type', register.contentType);
    return res.end(register.metrics());
}).listen(port);
server.setTimeout(30000);

// Graceful shutdown.
const shutdown = () => {
    server.close(() => {
        monitor.disconnect(() => {
            process.exit(0);
        });
    });
};
process.on('SIGTERM', () => shutdown());
process.on('SIGINT', () => shutdown());
