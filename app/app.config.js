(function() {
    'use strict';

    angular
        .module('app')
        .config(configFunction);

    configFunction.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configFunction(stateProvider, urlRouterProvider, locationProvider) {
        urlRouterProvider.otherwise("/");

        stateProvider
            .state("store", {
                url: "/",
                templateUrl: "views/store/index.html",
                controller: "storeController"
            })
            .state("cart", {
                url: "/cart",
                templateUrl: "views/store/cart.html",
                controller: "storeController"
            }).state("login", {
                url: "/login",
                templateUrl: "views/account/login.html",
                controller: "accountController"
            })
            .state("signup", {
                url: "/signup",
                templateUrl: "views/account/signup.html",
                controller: "accountController"
            });

        locationProvider.html5Mode(true);
    }
})();