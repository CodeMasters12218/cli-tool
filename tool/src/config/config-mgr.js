import loggerModule from '../logger.js';
const logger = loggerModule('config:mgr');

import { cosmiconfigSync } from 'cosmiconfig';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';

const ajv = new Ajv({ jsPropertySyntax: true });
const configLoader = cosmiconfigSync('tool');

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer schema.json de forma síncrona y parsear
const schemaPath = path.join(__dirname, 'schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

export default function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning('Invalid configuration was supplied');
      console.log();
      console.log(betterAjvErrors.default(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.debug('Found configuration', result.config);
  }
}
