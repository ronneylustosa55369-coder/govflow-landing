const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3333',
    browserName: 'chromium',
    launchOptions: {
      executablePath: '/opt/pw-browsers/chromium',
    },
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npx http-server . -p 3333 -s',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
    },
  ],
});
