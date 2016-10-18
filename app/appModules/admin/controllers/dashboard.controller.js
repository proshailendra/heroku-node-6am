(function() {
    'use strict';

    angular
        .module('adminApp')
        .controller('adminController', adminController);

    adminController.$inject = ['$rootScope', '$state'];

    function adminController(rootScope, state) {
        var vm = this;
        if (state.current.name === "admin") {
            rootScope.Title = "Admin Dashboard";
        }

        activate();

        ////////////////
        function activate() {}
    }
})();