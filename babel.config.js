/* eslint-disable no-undef */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@util': './src/util',
          '@llm': './src/llm',
        },
      },
    ],
  ],
}
