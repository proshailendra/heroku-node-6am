(function() {
    'use strict';

    angular.module('app', [
            "ui.router",
            "ngStorage"
        ])
        .constant("globalConfig", {
            apiAddress: "https://heroku-node-6am.herokuapp.com/api"
        });
})();