(function() {
    'use strict';

    angular
        .module('app')
        .controller('storeController', storeController);

    storeController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'storeService', 'authService'];

    function storeController($scope, $rootScope, $state, $stateParams, storeService, authService) {
        $rootScope.cart = new shoppingCart("mycart");
        if ($state.current.name === "store") {
            $rootScope.Title = "My Store";
            storeService.getProducts().success(function(data) {
                console.log(data);
                $scope.products = data;
            });
        } else if ($state.current.name === "productdetails") {
            $rootScope.Title = "Product Details";
            storeService.getProduct($stateParams.id).success(function(data) {
                $scope.product = data;
                // console.log($scope.products);
            });
        } else if ($state.current.name === "cart") {
            $rootScope.Title = "My Shopping Cart";
            $scope.checkout = function() {
                if (authService.authInfo.isAuth) {
                    var cart = $rootScope.cart;
                    cart.userId = authService.authInfo.userId;

                    storeService.saveCart(cart).success(function(data) {
                        console.log(data.id);

                        if (data.id !== undefined) {
                            $rootScope.cart.checkoutPayUmoney(data.id, authService.authInfo);
                        }
                    });
                } else {
                    $state.go("login", { state: "cart" });
                }
            };
        }
    }
})();