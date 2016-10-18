(function() {
    'use strict';

    angular
        .module('app')
        .factory('storeService', Service);

    Service.$inject = ['$http', 'globalConfig'];

    function Service(http, globalConfig) {
        var url = "";
        var service = {
            getProducts: getProducts,
            getProduct: getProduct,
            saveCart: saveCart
        };

        return service;

        ////////////////
        function getProducts() {
            url = globalConfig.apiAddress + "/store";
            return http.get(url);
        }

        function getProduct(id) {
            url = globalConfig.apiAddress + "/store/" + id;
            return http.get(url);
        }

        function saveCart(cart) {
            url = globalConfig.apiAddress + "/store/cart";
            return http.post(url, cart);
        }
    }
})();