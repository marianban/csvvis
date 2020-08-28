/* globals gauge, step, beforeSuite, afterSuite */

const {
  openBrowser,
  closeBrowser,
  goto,
  screenshot,
  text,
  click,
  link,
} = require('taiko');
const assert = require('assert');
const path = require('path');

const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
  await openBrowser({ headless: headless });
});

afterSuite(async () => {
  await closeBrowser();
});

gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(
    process.env['gauge_screenshots_dir'],
    `screenshot-${process.hrtime.bigint()}.png`
  );
  await screenshot({ path: screenshotFilePath });
  return path.basename(screenshotFilePath);
};

step('Goto localhost', async () => {
  await goto('http://localhost:3000');
});

step('Click on menu item <page>', async (page) => {
  await click(link({ href: page }));
});

step('Page contains <str>', async (str) => {
  await assert.ok(text(str).exists());
});
