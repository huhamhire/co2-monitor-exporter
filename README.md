# CO2 Monitor Exporter

> [!IMPORTANT]
> The Node.js exporter is no longer maintained. For Prometheus deployments,
> use [Air CO2 Exporter](https://github.com/huhamhire/air-co2-exporter), the
> Go successor for the same USB sensor.

Prometheus exporter for CO2 concentration and indoor temperature from TFA Dostmann AirCO2NTROL Mini in Node.JS.

Based on [node-co2-monitor](https://github.com/huhamhire/node-co2-monitor).

[![npm](https://img.shields.io/npm/v/co2-monitor-exporter.svg)](https://www.npmjs.com/package/co2-monitor-exporter)
[![npm downloads](https://img.shields.io/npm/dm/co2-monitor-exporter.svg)](https://www.npmjs.com/package/co2-monitor-exporter)


## Contents

* [Migration to Air CO2 Exporter](#migration-to-air-co2-exporter)
* [Supported Hardware](#supported-hardware)
* [Install](#install)
* [Usage](#usage)
* [Metrics](#metrics)
* [License](#license)


## Migration to Air CO2 Exporter

- Follow the [installation guide](https://github.com/huhamhire/air-co2-exporter#installation)
  and stop the Node.js exporter before starting the Go exporter so it can claim
  the USB device.
- Scrape `/metrics` on port `9110` by default, or set `--web.listen-address`
  to keep your existing scrape address and port.
- The Go exporter exposes `air_temp` and `air_co2` with a `tag` label.
  Set its value with `--label.tag` or `LABEL_TAG` and check any label filters
  in your dashboards and alert rules.


## Supported Hardware

* [TFA Dostmann AirCO2NTROL Mini - Monitor CO2 31.5006.02](https://www.amazon.de/dp/B00TH3OW4Q)


## Install

```bash
npm install co2-monitor-exporter -g
```


## Usage

```bash
co2-exporter [--port <port> --host <host>]
```

Or starting with PM2 as a service.
```bash
pm2 start `which co2-exporter` [-- --port <port> --host <host>]
```

By default the exporter will accept connections on `127.0.0.1:9091`. After the exporter is started, prometheus server would be able to retrieve metric data from the exporter.

![Grafana](https://huhamhire.github.io/co2-monitor-exporter/images/grafana.png)


## Metrics

  Name  | Description
--------|-------------
air_temp| Ambient Temperature (Tamb) in ℃.
air_co2 | Relative Concentration of CO2 (CntR) in ppm.


## License

MIT
