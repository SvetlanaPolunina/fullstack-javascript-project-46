import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import pluginJs from '@eslint/js'

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: [
      '**/*.js',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]
