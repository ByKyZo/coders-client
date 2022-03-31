const nextJest = require('next/jest');

const createJestConfig = nextJest({});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',

    '^@pages/(.*)$': '<rootDir>/src/pages/$1',

    '^@redux/(.*)$': '<rootDir>/src/redux/$1',

    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',

    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',

    '^@types/(.*)$': '<rootDir>/src/types/$1',

    '^@lib/(.*)$': '<rootDir>/src/lib/$1',

    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',

    '^@hoc/(.*)$': '<rootDir>/src/hoc/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
