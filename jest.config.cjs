module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['./src/tests/setupTests.ts'],
};
