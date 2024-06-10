import { fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jestDomConfig from 'eslint-plugin-jest-dom';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import testingLibrary from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';

export default [
  {
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}'],
    plugins: {
      'testing-library': fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    rules: testingLibrary.configs.react.rules,
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}'],
    plugins: {
      'jest-dom': fixupPluginRules({
        rules: jestDomConfig.rules,
      }),
    },
    rules: jestDomConfig.configs.recommended.rules,
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  eslintConfigPrettier,
];
