import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default config;
