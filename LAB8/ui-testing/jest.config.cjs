module.exports = {
    testMatch: [
      "**/?(*.)+(spec|test).[jt]s?(x)" // Виконує тільки Puppeteer-тести
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "testcafe.test.js" // Ігнорує TestCafe-тести
    ]
  };