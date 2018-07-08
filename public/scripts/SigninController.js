angular.module('ClinicalTrialsUseCase')
    .controller('SigninController', ['$rootScope', '$scope', '$localStorage', 'ClinicalTrialsUseCaseService', function ($rootScope, $scope, $localStorage, ClinicalTrialsUseCaseService) {
        ClinicalTrialsUseCaseService.logOut();
        $scope.emailid = '';
        $scope.password = '';
        
        $scope.LoginClick = function (form) {
            if (form.$valid) {
                var data = {
                    "emailid": $scope.emailid,
                    "password": $scope.password
                };
                ClinicalTrialsUseCaseService.signin(data); 
            }
        }

    }]);

function ShowWait() {
    if ($('.login-form').css("transform") == 'none') {
        $('.loading').css("transform", "rotateY(0deg)");
        var delay = 600;
        setTimeout(function () {
            $('.loading-spinner-large').css("display", "block");
            $('.loading-spinner-small').css("display", "block");
        }, delay);
    } else {
        $('.login-form').css("transform", "");
    }
}