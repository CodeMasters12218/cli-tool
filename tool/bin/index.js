#!/usr/bin/env node

import loggerModule from '../src/logger.js';
const logger = loggerModule('bin');

import arg from 'arg';
import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fork } from 'node:child_process';
import getConfig from '../src/config/config-mgr.js';
import start from '../src/commands/start.js';
import fetchData from '../src/commands/fetch.js';
import transform from '../src/commands/transform.js';
import exportData from '../src/commands/exportData.js';


try {
  const args = arg({
    '--start': Boolean,
    '--selector': String,
    '--output': String,
    '--attr': [String],
    '--filter': String,
    '--pick': String, 
    '--format': String,
  });

  logger.debug('Received args', args);

    if (args._[0] === 'script' && args._[1] === 'run') {
    const scriptPath = args._[2];
    if (!scriptPath) {
      logger.warning('You must specify a script file to run.');
      usage();
      process.exit(1);
    }

    const fullPath = resolve(process.cwd(), scriptPath);
    if (!existsSync(fullPath)) {
      logger.warning(`Script file not found: ${fullPath}`);
      process.exit(1);
    }
    if (!fullPath.endsWith('.js')) {
      logger.warning('Only .js script files are supported.');
      process.exit(1);
    }

    logger.debug(`Running script: ${fullPath}`);

    const child = fork(fullPath, {
      stdio: 'inherit',
    }); 

    child.on('exit', (code) => {
      process.exit(code);
    });
  }

  if (args['--start']) {
    const config = getConfig();
    start(config);
  } else if (args._[0] === 'fetch') {
    const url = args._[1];
    const selector = args['--selector'];
    const output = args['--output'];
    const attr = args['--attr'] || [];
    if (!url || !selector) {
      logger.warning('You must provide a URL and a selector');
      usage();
      process.exit(1);
    }
    await fetchData({ url, selector, output, attr });
  } else if (args._[0] === 'transform') {
    const inputFile = args._[1];
    const filter = args['--filter'];
    const pick = args['--pick'];

    if (!inputFile) {
      logger.warning('You must provide an input JSON file for transformation.');
      usage();
      process.exit(1);
    }

    await transform ({inputFile, filter, pick});
  } else if (args._[0] === 'export') {
    const inputFile = args._[1];
    const format = args['--format'];

    if (!inputFile) {
      logger.warning('You must provide an input JSON file for export.');
      usage();
      process.exit(1);
    }
    if (!format || !['csv', 'markdown', 'table'].includes(format.toLowerCase())) {
      logger.warning('You must provide a valid --format: csv, markdown, or table.');
      usage();
      process.exit(1);
    }
    await exportData({ inputFile, format });
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('fetch <url> --selector <css> [--attr name] [--output file]')}
    \tScrapes elements matching a CSS selector from the page
      ${chalk.greenBright('transform <inputFile> [--filter <filter>] [--pick <pick>]')}
    \tTransforms input JSON file
  ${chalk.greenBright('export <inputFile> --format <format>')}
    \tExports data in specified format
  ${chalk.greenBright('script run <script.js>')}
    \tRuns a user-defined JavaScript script file in Node.js
  `);
}
