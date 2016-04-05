/**
 * @ngdoc controller
 * @memberof dugun.popup
 * @name DugunPopupCtrl
 *
 * @requires $scope
 * @requires ui.bootstrap.modal:$uibModalInstance
 */
function DugunPopupCtrl($scope, $uibModalInstance) {
    $scope.close = function() {
        $uibModalInstance.dismiss();
    }
}

DugunPopupCtrl.$inject = [
    '$scope',
    '$uibModalInstance',
];

angular.module('dugun.popup').controller('DugunPopupCtrl', DugunPopupCtrl);
