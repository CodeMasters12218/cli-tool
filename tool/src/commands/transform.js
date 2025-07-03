import fs from 'fs/promises';

export default async function transform({ inputFile, filter, pick }) {
  try {
    const dataRaw = await fs.readFile(inputFile, 'utf-8');
    let data = JSON.parse(dataRaw);

    if (!Array.isArray(data)) {
      logger.warning('Input JSON should be an array of objects');
      process.exit(1);
    }

    if (filter) {
      data = applyFilter(data, filter);
    }

    if (pick) {
      const keys = pick.split(',').map(k => k.trim());
      data = data.map(item => {
        const picked = {};
        for (const key of keys) {
          if (key in item) picked[key] = item[key];
        }
        return picked;
      });
    }

    // Mostrar resultado o escribir a archivo
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    logger.warning(`Error reading or processing file: ${err.message}`);
    process.exit(1);
  }
}

function applyFilter(data, filter) {
  const match = filter.match(/^(\w+)\s*(>=|<=|==|!=|>|<)\s*(.+)$/);
  if (!match) {
    console.warn('Filter format incorrect. Expected e.g. age>30');
    return data;
  }

  const [, field, operator, valueRaw] = match;

  const value = isNaN(valueRaw) ? valueRaw : Number(valueRaw);

  return data.filter(item => {
    const itemValue = item[field];

    switch (operator) {
      case '>': return itemValue > value;
      case '<': return itemValue < value;
      case '>=': return itemValue >= value;
      case '<=': return itemValue <= value;
      case '==': return itemValue == value;
      case '!=': return itemValue != value;
      default: return true;
    }
  });
}

