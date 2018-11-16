export default class ApplicationLoggerDecorator {
  constructor(app, logger) {
    this.app = app;
    this.logger = logger;
  }

  init(...args) {
    this.logger.log('Application: initializing');
    return this.app(...args);
  }

  initWidget(...args) {
    return this.app(...args);
  }
}