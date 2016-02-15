module.exports = function(config) {
    config.set({
        basePath: './',

        frameworks: ['jasmine'],

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/dugun-popup.module.js',
            'src/config.js',
            'src/dugun-popup.service.js',
        ],

        autoWatch : true,

        browsers: [
            'PhantomJS',
        ],
    });
};
