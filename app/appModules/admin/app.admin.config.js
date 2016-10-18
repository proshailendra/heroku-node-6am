(function() {
    'use strict';

    angular
        .module('adminApp')
        .config(configFunction);

    configFunction.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configFunction(stateProvider, urlRouterProvider, locationProvider) {
        urlRouterProvider.otherwise("/");

        stateProvider
            .state("admin", {
                url: "/admin",
                templateUrl: "appModules/admin/views/dashboard/index.html",
                controller: "adminController"
            })
            .state("category", {
                url: "/admin/category",
                templateUrl: "appModules/admin/views/category/index.html",
                controller: "categoryController"
            })
            .state("createCategory", {
                url: "/admin/category/create",
                templateUrl: "appModules/admin/views/category/create.html",
                controller: "categoryController"
            })
            .state("editCategory", {
                url: "/admin/category/edit/:id",
                templateUrl: "appModules/admin/views/category/create.html",
                controller: "categoryController"
            }).state("product", {
                url: "/admin/product",
                templateUrl: "appModules/admin/views/product/index.html",
                controller: "productController"
            })
            .state("createProduct", {
                url: "/admin/product/create",
                templateUrl: "appModules/admin/views/product/create.html",
                controller: "productController"
            });

        locationProvider.html5Mode(true);
    }
})();