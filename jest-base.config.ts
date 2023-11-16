import tsconfig from './tsconfig.json';
import moduleNameMapper from 'tsconfig-paths-jest';
moduleNameMapper(tsconfig);

export const defaultConfigTest = {
    moduleNameMapper,
    preset: 'ts-jest',
    testEnvironment: 'node',

    rootDir: './',

    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/**/*.ts',
        '!<rootDir>/**/*.interface.ts',
        '!<rootDir>/**/*.mock.ts',
        '!<rootDir>/**/*.module.ts',
        '!<rootDir>/**/__mock__/*',
        '!<rootDir>/src/main.ts'
    ],
    coverageProvider: 'v8',
    coverageReporters: [
        'clover',
        'json',
        'lcov',
        'text',
        'text-summary'
    ],
    resetModules: true,
    setupFiles: [
        'dotenv/config'
    ],
    // Add the community jest-extended matchers
    setupFilesAfterEnv: [
        'jest-extended'
    ],
    verbose: false
};