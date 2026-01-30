import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',                   // use ts-jest for TypeScript
  testEnvironment: 'jsdom',            // browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // RTL setup
  moduleNameMapper: {
    // Handle CSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle images
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle `@` alias
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  // --- coverage settings ---
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',    // collect coverage from all ts/tsx files in src
    '!src/**/*.d.ts',         // ignore TypeScript declaration files
    '!src/**/index.{ts,tsx}'  // optionally ignore barrel files
  ]
};

export default config;