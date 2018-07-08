'use strict';

/* Controllers */

angular.module('ClinicalTrialsUseCase')
    .controller('IndexController', ['$rootScope', '$scope', '$location', '$localStorage', 'ClinicalTrialsUseCaseService', function ($rootScope, $scope, $location, $localStorage, ClinicalTrialsUseCaseService) {
        var currentUser = ClinicalTrialsUseCaseService.getUserFromToken();
        if (currentUser.name == undefined) {
            $location.path('/signin');
        }
        else {
            ClinicalTrialsUseCaseService.setBootUpValues(currentUser);            
        }
        $scope.LogoutUser = function () {
            ClinicalTrialsUseCaseService.logOut();
        }
    }]);
