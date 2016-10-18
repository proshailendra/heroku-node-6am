angular
    .module('app')
    .factory('authService', function($http, $sessionStorage, globalConfig) {
        var url = "";
        var authInfo = {
            isAuth: false,
            fullName: "",
            contactNo: "",
            userId: 0,
            userName: "",
            token: "",
            roles: []
        };

        //initializing
        (function() {
            if ($sessionStorage.authInfo != null) {
                authInfo = $sessionStorage.authInfo;
            }
        })();

        var clearHeader = function() {
            if (authInfo.token == "") {
                $http.defaults.headers.common['Authorization'] = "";
            }
        };

        var logOut = function() {
            $sessionStorage.authInfo = undefined;
            clearHeader();

            authInfo.isAuth = false;
            authInfo.userName = "";
            authInfo.contactNo = "";
            authInfo.userId = 0;
            authInfo.token = "";
        };

        var setAuthInfo = function(data) {
            if (data !== undefined) {
                authInfo.userName = data.userName;
                authInfo.userId = data.userId;
                authInfo.isAuth = true;
                authInfo.token = data.token;
                authInfo.fullName = data.fullName;
                authInfo.contactNo = data.contactNo;
                authInfo.roles = data.roles;

                $sessionStorage.authInfo = authInfo;
                // console.log($sessionStorage.authInfo);
            }
        };

        var authUser = function(user) {
            url = globalConfig.apiAddress + "/auth/login";
            return $http.post(url, user);
        };

        function signUp(user) {
            url = globalConfig.apiAddress + "/auth/signup";
            return $http.post(url, user);
        }

        var service = {
            authUser: authUser,
            setAuthInfo: setAuthInfo,
            signUp: signUp,
            authInfo: authInfo,
            logOut: logOut
        };
        return service;
    });