import loggerModule from '../logger.js';
const logger = loggerModule('commands:start');

export default function start(config) {
  logger.highlight('  Starting the app  ');
  logger.debug('Received configuration', config);
}