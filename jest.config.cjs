/** @type {import {'jest'}.config} */
const config = {
  preset: 'ts-jest',
  testEnviroment: 'node',
  roots: ['<rootDir>/services'],
  testMatch: ['**/test/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  testTimeout: 10000,
};
module.exports = config;