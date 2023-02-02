module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'dist/config', 'dist/app.js'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  transform: { '\\.ts$': ['ts-jest'] },
  };