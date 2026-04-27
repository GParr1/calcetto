module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            src: './src',
            components: './src/components',
            state: './src/state',
            utils: './src/utils',
            properties: './src/properties',
            types: './src/types',
          },
        },
      ],
    ],
  };
};
