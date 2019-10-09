"use strict";

const bunyan = require('bunyan');
const RotatingFileStream = require('bunyan-rotating-file-stream');

const config = require('../config/config');

let logger = bunyan.createLogger({
    name: config.appName,
    src: true,
    streams: [
            {
            type: 'raw',
            level: config.logLevel,
            stream: new RotatingFileStream({
                path: `${config.logsPath}/${config.appName}.log`,
                period: '1d',          // daily rotation
                totalFiles: 10,        // keep 10 back copies
                rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
                threshold: '10m',      // Rotate log files larger than 10 megabytes
                totalSize: '20m',      // Don't keep more than 20mb of archived log files
                gzip: true             // Compress the archive log files to save space
            }),
        },
        {
            stream: process.stdout,
            level: config.logLevel
        }

    ],
});

if (process.env.NODE_ENV === "unit-test") {
    logger.level(bunyan.FATAL + 1);
}

module.exports = logger;
