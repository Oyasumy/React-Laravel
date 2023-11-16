// jest.config.ts
// import './resources/js/src/test/setup/setupDomTests';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  rootDir: 'resources/js/src',

  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/components/$1',

    '^@constants': '<rootDir>/constants/index',
    '^@constants(.*)$': '<rootDir>/constants/$1',

    '^@hooks': '<rootDir>/hooks/index',
    '^@hooks(.*)$': '<rootDir>/hooks/$1',

    '^@navigation(.*)$': '<rootDir>/navigation/$1',
    '^@pages(.*)$': '<rootDir>/pages/$1',
    '^@reducer(.*)$': '<rootDir>/redux/$1',
    '^@util': '<rootDir>/util/index',

    '^@networking(.*)$': '<rootDir>/networking/$1',
  },

  moduleDirectories: ['node_modules', '<rootDir>'],

  // moduleDirectories: ['node_modules', '<rootDir>/src'],
  // moduleNameMapper: {
  //   '\\.(css|less)$': '<rootDir>/src/tests/mocks/style-mock.js',
  // },
  // setupFilesAfterEnv: ['./jest.setup.ts'],
  setupFiles: ['<rootDir>/test/setup/setupDomTests.ts'],
};
