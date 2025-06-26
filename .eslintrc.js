
rules: {
  '@typescript-eslint/no-unused-vars'; ['error', {
    argsIgnorePattern: '^_',         // funksiyadagi parametrlarga
    varsIgnorePattern: '^_',         // o'zgaruvchilar/importlarga
  }]
}
