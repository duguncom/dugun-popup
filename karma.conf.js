module.exports = function(config) {
    config.set({
        basePath: './',

        frameworks: ['jasmine'],

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
            'src/dugun-popup.module.js',
            'src/config.js',
            'src/dugun-popup.service.js',
            'src/dugun-popup.controller.js',
            // 'dist/dugun-popup.js',
            'test/dugun-popup.spec.js',
        ],

        autoWatch : true,

        browsers: [
            'PhantomJS',
        ],
    });
};
