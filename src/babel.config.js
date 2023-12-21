module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      },
      // Например, в вашем файле jest.config.js или package.json
      {
        testEnvironment: 'jsdom'
      }
    ]
  ],

  plugins: ['@babel/plugin-proposal-class-properties']
}
