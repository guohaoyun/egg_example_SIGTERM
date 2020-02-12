// app.js
const Promise = require('bluebird');
const Logger = require('egg-logger').Logger;
const FileTransport = require('egg-logger').FileTransport;

class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  async serverDidReady() {
    const logger = new Logger();
    logger.set('file', new FileTransport({
      file: './log',
      level: 'INFO',
    }));
    process.on('SIGTERM', async () => {
      logger.info('异步开始');
      await require('bluebird').delay(3000);
      logger.info('异步结束');
    });
  }
}

module.exports = AppBootHook