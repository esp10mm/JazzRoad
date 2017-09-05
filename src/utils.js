import debug from 'debug';

module.exports = {
  debug: debug('dev:'),
  sleep: (time) => (new Promise((resolve) => {
    setTimeout(resolve, time);
  }))
}
