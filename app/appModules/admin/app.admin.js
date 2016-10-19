(function() {
    'use strict';

    angular.module('adminApp', [
            "ui.router",
            'ngFileUpload'
        ])
        .constant("globalConfig", {
            apiAddress: "https://heroku-node-6am.herokuapp.com/api"
        });
})();