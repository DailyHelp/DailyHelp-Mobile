module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-paper/babel',
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-transform-class-properties', {loose: true}],
  ],
};
