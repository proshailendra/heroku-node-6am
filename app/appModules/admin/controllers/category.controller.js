(function() {
    'use strict';

    angular
        .module('adminApp')
        .controller('categoryController', categoryController);

    categoryController.$inject = ['$scope', '$rootScope', '$state', 'categoryService', '$stateParams'];

    function categoryController(scope, rootScope, state, categoryService, stateParams) {
        if (state.current.name === "category") {
            rootScope.Title = "Category List";
            categoryService.getCategories().success(function(data) {
                //console.log(data);
                scope.categories = data;
            });
        } else if (state.current.name === "createCategory") {
            rootScope.Title = "Create Category";
            scope.saveData = function(model) {
                categoryService.addCategory(model).success(function(data) {
                    if (data == "created") {
                        state.go("category");
                    }
                });
            };
        } else if (state.current.name === "editCategory") {
            var id = stateParams.id;
            rootScope.Title = "Edit Category";
            categoryService.getCategory(id).success(function(data) {
                scope.model = data;
            });

            scope.saveData = function(model) {
                categoryService.updateCategory(model).success(function(data) {
                    if (data == "updated") {
                        state.go("category");
                    }
                });
            };
        }
        scope.deleteCategory = function(id) {
            if (confirm('Are you sure to delete?')) {
                categoryService.deleteCategory(id).success(function(data) {
                    if (data == "deleted") {
                        state.go("category", null, { reload: true });
                    }
                });
            }
        };
    }
})();