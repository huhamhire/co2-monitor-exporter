#!/usr/bin/env node
'use strict';
const http = require('http');
const prom = require('prom-client');
const CO2Monitor = require('node-co2-monitor');

const argv = require('yargs').argv;
const settings = {
    port: argv.port || 9101
};

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

monitor.connect((err) => {
    if (err) {
        console.error(err.stack);
        return process.exit(1);
    }
    monitor.transfer();
});

let _err;

// Register update events.
monitor.on('temp', (temperature) => {
    _tempGauge.set(temperature);
    _err = undefined;
});
monitor.on('co2', (co2) => {
    _co2Gauge.set(co2);
    _err = undefined;
});
monitor.on('error', (err) => {
    _err = err;
});

// Start Server.
const server = http.createServer((req, res) => {
    // Only allowed to poll prometheus metrics.
    if (req.method !== 'GET' && req.url !== '/metrics') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('Not Found.');
    }
    if (_err) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        return res.end('Device Error.');
    }
    res.setHeader('Content-Type', register.contentType);
    return res.end(register.metrics());
}).listen(settings.port);
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
