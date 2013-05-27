require.config({
    baseUrl: "../js/",
    paths: {
        'jquery': 'lib/jquery-1.8.3.min',
        'underscore': 'lib/underscore-min-1.4.4',
        'jasmine': '../test/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': '../test/lib/jasmine-1.3.1/jasmine-html',
        'spec': '../test/spec/'
    },
    shim: {
        'underscore': {
            exports: "_"
        },
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['jquery','underscore', 'jasmine-html'], function($, _, jasmine){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = ['spec/PromiseQueueSpec'];

    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});
