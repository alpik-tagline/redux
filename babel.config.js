module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/Components',
          '@screens': './src/Screens',
          '@navigation': './src/Navigation',
          '@store': './src/store',
          '@service': './src/service',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.jpg', '.jpeg'],
      },
    ],
  ],
};
