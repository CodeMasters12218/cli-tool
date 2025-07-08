import fs from 'fs/promises';
import { parse as json2csv } from 'json2csv';
import loggerModule from '../logger.js';
const logger = loggerModule('export');

export default async function exportData({ inputFile, format }) {
  try {
    const raw = await fs.readFile(inputFile, 'utf-8');
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      logger.warning('Input data should be an array');
      process.exit(1);
    }

    let output;

    switch (format) {
      case 'csv':
        output = json2csv(data);
        break;
      case 'markdown':
        output = toMarkdownTable(data);
        break;
      case 'table':
        output = toTextTable(data);
        break;
      default:
        logger.warning('Unsupported format');
        process.exit(1);
    }

    console.log(output);
  } catch (err) {
    logger.warning(`Error exporting data: ${err.message}`);
    process.exit(1);
  }
}

function toMarkdownTable(data) {
  if (data.length === 0) return '';

  const keys = Object.keys(data[0]);
  const header = '| ' + keys.join(' | ') + ' |';
  const separator = '| ' + keys.map(() => '---').join(' | ') + ' |';

  const rows = data.map(row =>
    '| ' + keys.map(k => String(row[k] ?? '')).join(' | ') + ' |'
  );

  return [header, separator, ...rows].join('\n');
}

function toTextTable(data) {
  if (data.length === 0) return '';

  const keys = Object.keys(data[0]);
  const colWidths = keys.map(k =>
    Math.max(k.length, ...data.map(row => String(row[k] ?? '').length))
  );

  const pad = (str, width) => str + ' '.repeat(width - str.length);

  const header = keys.map((k, i) => pad(k, colWidths[i])).join(' | ');
  const separator = colWidths.map(w => '-'.repeat(w)).join('-|-');

  const rows = data.map(row =>
    keys.map((k, i) => pad(String(row[k] ?? ''), colWidths[i])).join(' | ')
  );

  return [header, separator, ...rows].join('\n');
}
