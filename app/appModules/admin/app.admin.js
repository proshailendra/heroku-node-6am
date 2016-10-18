(function() {
    'use strict';

    angular.module('adminApp', [
            "ui.router",
            'ngFileUpload'
        ])
        .constant("globalConfig", {
            apiAddress: "http://localhost:3000/api"
        });
})();