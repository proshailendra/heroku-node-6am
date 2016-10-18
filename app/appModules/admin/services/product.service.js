(function() {
    'use strict';
    angular.module('adminApp').factory('productService', productService);

    productService.$inject = ['$http', 'globalConfig'];

    function productService($http, globalConfig) {
        var url = "";

        //self executable
        //(function init() {
        //    authService.setHeader();
        //})();

        var service = {
            GetProducts: getProducts,
            GetProduct: getProduct,
            DeleteProduct: deleteProduct,
            AddProduct: addProduct
        };

        return service;

        function getProducts() {
            url = globalConfig.apiAddress + "/product";
            return $http.get(url);
        }

        function getProduct(id) {
            url = globalConfig.apiAddress + "/product/" + id;
            return $http.get(url);
        }

        function deleteProduct(id) {
            url = globalConfig.apiAddress + "/product/" + id;
            return $http.delete(url);
        }

        function addProduct(product) {
            url = globalConfig.apiAddress + "/product";
            return $http.post(url, product);
        }
    }
})();