'use strict';
const http = require('http');
const prom = require('prom-client');
const CO2Monitor = require('node-co2-monitor');

// Initialize prometheus metrics.
const _co2Gauge = new prom.Gauge({
    'name': 'air_co2',
    'help': 'Relative Concentration of CO2 (CntR) in ppm.',
    'labels': ['tag', 'location']
});
_co2Gauge.set(-1);
const _tempGauge = new prom.Gauge({
    'name': 'air_temp',
    'help': 'Ambient Temperature (Tamb) in ℃.',
    'labels': ['tag', 'location']
});
_tempGauge.set(-1);

const register = new prom.Registry();
register.registerMetric(_tempGauge);
register.registerMetric(_co2Gauge);

// Setup CO2 Monitor
const monitor = new CO2Monitor();
monitor.connect(() => {
    console.log('CO2 Monitor connected.');
    // Read CO2 monitor metrics every 10 seconds.
    setInterval(() => {
        monitor.transfer(() => {
            _tempGauge.set(monitor.temperature);
            _co2Gauge.set(monitor.co2);
        });
    }, 10000);
});

const port = 9101;

// Start Server
http.createServer((req, res) => {
    // Only allowed to poll prometheus metrics.
    if (req.method !== 'GET' && req.url !== '/metrics') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('Not Found.');
    }
    res.setHeader('Content-Type', register.contentType);
    return res.end(register.metrics());
}).listen(port);
