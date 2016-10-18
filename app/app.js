(function() {
    'use strict';

    angular.module('app', [
            "ui.router",
            "ngStorage"
        ])
        .constant("globalConfig", {
            apiAddress: "http://localhost:3000/api"
        });
})();