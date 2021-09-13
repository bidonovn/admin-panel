// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest.config.base');

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['/node_modules/', '/packages/'],
  projects: ['<rootDir>/jest.config.js'],
  coverageDirectory: '<rootDir>/__coverage__',
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/packages/**/node_modules/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/packages/**/dist/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/packages/**/index.{ts,tsx,js,jsx}',
  ],
};
