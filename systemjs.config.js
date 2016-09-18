(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/',
    },
    map: {
      app: 'build'
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);