'use strict';

angular.module('ClinicalTrialsUseCase')
    .factory('ClinicalTrialsUseCaseService', ['$http', '$localStorage', '$rootScope', '$location', function ($http, $localStorage, $rootScope, $location) {
        var baseUrl = "http://localhost:2000";
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
        function setBootUpValues(currentUser) {
            $rootScope.showflag = true;
            $rootScope.uid = currentUser.id;
            $rootScope.name = currentUser.name;
            $rootScope.EMail = currentUser.email;
            $rootScope.fileBusinessType = currentUser.UserType;
            $rootScope.errorclass = 'rederror';
            $rootScope.baseurl = baseUrl;
            return SetNavigation(currentUser);
        }
        function SetNavigation(user) {
            $rootScope.viewAdmin = false;
            $rootScope.viewDrug = false;
            $rootScope.viewHome = false;
            $rootScope.viewDrug = false;
            $rootScope.viewHelp = false;
            $rootScope.viewContact = false;
            $rootScope.viewStocks = false;
            $rootScope.viewShipment = false;
            var path ='';
            switch (user.UserType) {
                case "Mining Company":
                    $rootScope.viewHome = true;
                    $rootScope.viewDrug = true;
                    $rootScope.viewHelp = true;
                    $rootScope.viewContact = true;
                    $('#homelink').attr("href", "#/ore");
                    $('#flaskLink').attr("href", "#/ore");
                    return path ='/ore';
                case "Conversion and Enrichment":
                    $rootScope.viewHome = true;
                    $rootScope.viewHelp = true;
                    $rootScope.viewContact = true;
                    $rootScope.viewShipment = true;
                    $('#homelink').attr("href", "#/cae");
                    $('#flaskLink').attr("href", "#/cae");
                    $('#sendshipment').attr("href", "#/caes");
                    return path ='/cae';
                case "Fuel Fabrication Plant":
                    $rootScope.viewHome = true;
                    $rootScope.viewHelp = true;
                    $rootScope.viewContact = true;
                    $rootScope.viewShipment = true;
                    $('#homelink').attr("href", "#/fabrication");
                    $('#flaskLink').attr("href", "#/fabrication");
                    $('#sendshipment').attr("href", "#/fabrications");
                    return path ='/fabrication';
                case "Nuclear Power Plant":
                    $rootScope.viewHome = true;
                    $rootScope.viewHelp = true;
                    $rootScope.viewContact = true;
                    $('#homelink').attr("href", "#/plant");
                    $('#flaskLink').attr("href", "#/plant");
                    return path ='/plant';
                case "Admin":
                    $rootScope.viewAdmin = true;
                    $rootScope.viewDrug = true;
                    $rootScope.viewHome = true;
                    $rootScope.viewDrug = true;
                    $rootScope.viewHelp = true;
                    $rootScope.viewContact = true;
                    break;
            }

        }
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        return {

            signin: function (data, callback) {
                $http.post(baseUrl + '/authenticate', data).then(function (response) {
                    $rootScope.name = response.data.data.name;
                    $rootScope.EMail = response.data.data.email;
                    if (response.data.token != undefined) {
                        $rootScope.showflag = true;
                        $localStorage.token = response.data.token;
                        var user = getUserFromToken();
                        var pathT = setBootUpValues(user);
                        $location.path(pathT);
                    }
                }, function (response) {
                    return "Something went wrong";
                }
                );
            },
            getUserFromToken: function (success) {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                return user;
            },
            getBaseUrl: function () {
                return baseUrl;
            },
            setBootUpValues: function (currentUser) {
                setBootUpValues(currentUser);
            },
            setTopNavigation: function () {
                SetNavigation(currentUser);
            },
            logOut: function () {
                $rootScope.showflag = false;
                $rootScope.name = '';
                $rootScope.EMail = '';
                $rootScope.fileBusinessType = '';
                delete $localStorage.token;
                $location.path('/signin');
            }
        };
    }
    ]);