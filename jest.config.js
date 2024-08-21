module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/src/**/*.(spec)+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  verbose: true,
};
