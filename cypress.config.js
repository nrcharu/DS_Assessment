const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "chromeWebSecurity": false,
  "experimentalFetchPolyfill": true,
  "reporter": 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://staging.directshifts.com/',
    scrollBehavior: 'nearest',
    
  },
});
