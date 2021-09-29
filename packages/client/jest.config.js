const baseConfig = require('../../jest.config.base');
const packageJson = require('./package.json');

const packageName = packageJson.name;

module.exports = {
    ...baseConfig,
    name: packageName,
    displayName: packageName,
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@axios(.*)$': '<rootDir>/src/axios$1',
        '^@components(.*)$': '<rootDir>/src/modules/components$1',
        '^@models(.*)$': '<rootDir>/src/models$1',
        '^@hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@utils(.*)$': '<rootDir>/src/utils$1',
    },
    setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
};
