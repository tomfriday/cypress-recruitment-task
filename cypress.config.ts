import {defineConfig} from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.neonet.pl/",
    env: {
      MAILOSAUR_API_KEY: "HY13IeMr6wrPI4YtCenHqfLHNqdYXs3a",
    },
    testIsolation: false,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 55000,
    defaultCommandTimeout: 50000,
    setupNodeEvents(on, config) {},
  },
});
