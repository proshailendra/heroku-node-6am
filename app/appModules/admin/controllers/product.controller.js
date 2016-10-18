(function() {
    'use strict';
    angular.module('adminApp').controller('productController', productController);

    productController.$inject = ['$scope', 'productService', 'categoryService', '$state', '$stateParams', 'globalConfig', 'Upload'];

    function productController($scope, productService, categoryService, $state, $stateParams, globalConfig, Upload) {
        $scope.Products = [];
        $scope.product = {};
        $scope.Categories = null;

        function GetCategories() {
            categoryService.getCategories().success(function(data) {
                $scope.Categories = data;
            });
        }

        if ($state.current.name == "product") {
            productService.GetProducts().success(function(data) {
                $scope.Products = data;
            });
        } else if ($state.current.name == "createProduct") {
            GetCategories();
        } else if ($state.current.name == "editProduct") {
            productService.GetProduct($stateParams.id).success(function(data) {
                $scope.product = data;
                // $scope.ddlCategory._id=data.categoryId;
                GetCategories();
            });
        }

        $scope.saveData = function(product) {
            // console.log(product);
            // Save
            var myFile = $scope.product.image;
            var url = globalConfig.apiAddress + "/file";

            Upload.upload({
                url: url,
                data: { file: myFile[0] }
            }).then(function(res) {
                //console.log(res.data.filePath);
                if (res.data.filePath !== "error") {
                    product.imagePath = res.data.filePath;
                    product.categoryId = $scope.ddlCategory._id;
                    //   console.log(product);
                    productService.AddProduct(product).success(function(data) {
                        if (data == "created") {
                            $state.go("product");
                        }
                    });
                }
            }, function(err) {
                console.log("Error status: " + err.status);
            });
        };
        $scope.Delete = function(id) {
            if (confirm('Are you sure to delete?')) {
                productService.DeleteProduct(id).success(function(data) {
                    if (data == 'deleted') {
                        $state.go("product", {}, { reload: true });
                    }
                });
            }
        };
        $scope.GetByCategoryId = function(id) {
            productService.DeleteProduct(id).success(function(data) {
                if (data == 'deleted') {
                    $state.go("product", {}, { reload: true });
                }
            });
        };
    }
})();