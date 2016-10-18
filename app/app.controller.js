(function() {
    'use strict';

    angular
        .module('app')
        .controller('appController', appController);

    appController.$inject = ['$scope', '$location', 'authService'];

    function appController($scope, $location, authService) {
        $scope.logOut = function() {
            authService.logOut();
            $location.path('/login');
        };

        function init() {
            $scope.authInfo = authService.authInfo;
        }
        init();
    }
})();