const log4js = require('log4js');

const LOG_PATH = '../logs/';

log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            filename: `${LOG_PATH}/access.log`,
            pattern: '-yyyy-MM-dd',
            backups: 3,
        },
        debug: {
            type: 'dateFile',
            filename: `${LOG_PATH}/debug.log`,
            pattern: '-yyyy-MM-dd',
            backups: 3,
        }
    },
    categories: {
        default: { appenders: ['access'], level: 'ALL' },
        access: { appenders: ['access'], level: 'DEBUG' },
        debug: { appenders: ['debug'], level: 'DEBUG' }
    },
});

module.exports = {
    access: log4js.getLogger('access'),
    debug: log4js.getLogger('debug'),
    default: log4js.getLogger('default'),
    express: log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.INFO }),
};