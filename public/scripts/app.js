'use strict';

angular.module('ClinicalTrialsUseCase', ['ngStorage','ngRoute','angular-loading-bar'])
.config(['$routeProvider', '$httpProvider','$locationProvider', function ($routeProvider, $httpProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'SigninController'
        }).
        when('/ustatus', {
            templateUrl: 'partials/Uraniumstatus.html',
            controller: 'UraniumstatusController'
        }).
        when('/ore', {
            templateUrl: 'partials/Mining.html',
            controller: 'MiningController'
        }).        
        when('/cae', {
            templateUrl: 'partials/homecro.html',
            controller: 'HomeCROController'
        }).
        when('/fabrication', {
            templateUrl: 'partials/homefabrication.html',
            controller: 'FabricationController'
        }).
        when('/fabrications', {
            templateUrl: 'partials/FabricationShipmentSend.html',
            controller: 'FabricationShipmentSendController'
        }).
        when('/caes', {
            templateUrl: 'partials/ConversionShipmentSend.html',
            controller: 'ConversionShipmentSendController'
        }).
        when('/plant', {
            templateUrl: 'partials/homeplant.html',
            controller: 'PlantController'
        }).
        otherwise({
            redirectTo: '/signin'
        });
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    





}

])
.run(['$rootScope',function($rootScope){
$rootScope.showflag = false;
}
]);
