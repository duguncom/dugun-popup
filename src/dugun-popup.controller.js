/**
 * @ngdoc controller
 * @memberof dugun.popup
 * @name DugunPopupCtrl
 *
 * @requires $uibModalInstance
 */
function DugunPopupCtrl($uibModalInstance) {
    $scope.close = function() {
        $uibModalInstance.dismiss();
    }
}

DugunPopupCtrl.$inject = [
    '$uibModalInstance',
];

angular.module('dugun.popup').controller('DugunPopupCtrl', DugunPopupCtrl);
