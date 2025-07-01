import puppeteer from 'puppeteer';
import fs from 'fs';
import loggerModule from '../logger.js';
const logger = loggerModule('commands:fetch');

export default async function fetch({ url, selector, output, attr }) {
  logger.highlight('  Fetching data...  ');
  logger.debug(`URL: ${url}, Selector: ${selector}`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const elements = await page.$$eval(selector, (els, attrList) =>
    els.map(el => {
      const data = {};
      data.text = el.innerText.trim();
      attrList.forEach(attr => {
        data[attr] = el.getAttribute(attr);
      });
      return data;
    }),
    attr 
  );

  await browser.close();

  if (elements.length === 0) {
    logger.warning('No elements found for selector:', selector);
  } else {
    logger.log(`Found ${elements.length} elements`);
  }

  if (output) {
    fs.writeFileSync(output, JSON.stringify(elements, null, 2), 'utf-8');
    logger.log(`Saved output to ${output}`);
  } else {
    console.log(elements);
  }
}
