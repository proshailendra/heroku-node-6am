(function() {
    'use strict';

    angular
        .module('adminApp')
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', 'globalConfig'];

    function categoryService(http, globalConfig) {
        var url = "";
        var service = {
            getCategories: getCategories,
            getCategory: getCategory,
            addCategory: addCategory,
            updateCategory: updateCategory,
            deleteCategory: deleteCategory
        };

        return service;

        ////////////////
        function getCategories() {
            url = globalConfig.apiAddress + "/category";
            return http.get(url);
        }

        function getCategory(id) {
            url = globalConfig.apiAddress + "/category/" + id;
            return http.get(url);
        }

        function addCategory(model) {
            url = globalConfig.apiAddress + "/category";
            return http.post(url, model);
        }

        function updateCategory(model) {
            url = globalConfig.apiAddress + "/category/" + model._id;
            return http.put(url, model);
        }

        function deleteCategory(id) {
            url = globalConfig.apiAddress + "/category/" + id;
            return http.delete(url);
        }
    }
})();