(function() {
    'use strict';

    angular
        .module('app')
        .controller('accountController', accountController);

    accountController.$inject = ['$scope', '$rootScope', 'authService', '$state', '$stateParams'];

    function accountController($scope, $rootScope, authService, $state, $stateParams) {
        $rootScope.title = 'User Login';
        $scope.goState = "";
        if ($stateParams !== undefined) {
            $scope.goState = $stateParams.state;
            console.log($scope.goState);
        }
        $scope.login = function(user) {
            authService.authUser(user).success(function(data) {
                console.log(data);
                if (data.success == true) {
                    authService.setAuthInfo(data.authObj);
                    if (data.authObj.roles.indexOf("Admin") >= 0) {
                        $state.go("admin");
                    } else {
                        if ($scope.goState !== undefined && $scope.goState !== "") {
                            $state.go($scope.goState);
                        } else {
                            $state.go("store");
                        }
                    }
                } else {
                    console.log("Invalid Credential");
                }
            });
        };

        $scope.signup = function() {
            $scope.saveData = function(user) {
                authService.signUp(user).success(function(data) {
                    if (data == "created") {
                        $state.go("login");
                    }
                });
            };
        };
    }
})();