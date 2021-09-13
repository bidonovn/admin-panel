module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  testURL: 'http://localhost',
  transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
      'ts-jest': {
          tsconfig: {
              jsx: 'react',
          },
      },
  },
};
