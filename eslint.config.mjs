import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['node_modules/**', 'dist/**', '.expo/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/theme/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'Use tokens de src/theme.',
        },
      ],
    },
  },
);
