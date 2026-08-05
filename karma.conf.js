// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const fs = require('fs');
const os = require('os');
const path = require('path');

/**
 * Ubica el Chrome que descarga puppeteer, para no depender de que haya un
 * Chrome instalado en el sistema (ni en local ni en CI).
 *
 * Si algo falla se deja `CHROME_BIN` sin tocar y Karma usa el Chrome del
 * sistema, que es el comportamiento anterior.
 */
function resolvePuppeteerChrome() {
  try {
    const { computeExecutablePath } = require('@puppeteer/browsers');
    const cacheDir =
      process.env.PUPPETEER_CACHE_DIR || path.join(os.homedir(), '.cache', 'puppeteer');
    const chromeDir = path.join(cacheDir, 'chrome');

    if (!fs.existsSync(chromeDir)) return null;

    // Los directorios tienen la forma `<plataforma>-<buildId>`, por ejemplo
    // `win64-151.0.7922.47` o `linux64-151.0.7922.47`.
    const builds = fs
      .readdirSync(chromeDir)
      .map((name) => name.split('-').slice(1).join('-'))
      .filter(Boolean)
      .sort();

    if (builds.length === 0) return null;

    const executable = computeExecutablePath({
      browser: 'chrome',
      buildId: builds[builds.length - 1],
      cacheDir
    });

    return fs.existsSync(executable) ? executable : null;
  } catch {
    return null;
  }
}

if (!process.env.CHROME_BIN) {
  const chrome = resolvePuppeteerChrome();
  if (chrome) process.env.CHROME_BIN = chrome;
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/vex'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    // Navegador sin interfaz; se usa en CI (ver .github/workflows/ci.yml)
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
