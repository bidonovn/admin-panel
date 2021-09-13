const baseConfig = require('../../jest.config.base');

const packageJson = require('./package.json');

const packageName = packageJson.name;

module.exports = {
    ...baseConfig,
    name: packageName,
    displayName: packageName,
    testEnvironment: 'node',
    clearMocks: true,
    setupFilesAfterEnv: ['jest-extended'],
};
