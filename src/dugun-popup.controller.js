/**
 * @ngdoc controller
 * @memberof dugun.popup
 * @name DugunPopupCtrl
 *
 * @requires $scope
 * @requires ui.bootstrap.modal:$uibModalInstance
 */
function DugunPopupCtrl($scope, $uibModalInstance, data) {
    $scope.data = angular.copy(data) || {};

    $scope.close = function() {
        if(angular.equals($scope.data, data) || angular.equals($scope.data, {})) {
            $uibModalInstance.dismiss();
        } else {
            $uibModalInstance.close($scope.data);
        }
    }
}

DugunPopupCtrl.$inject = [
    '$scope',
    '$uibModalInstance',
    'data',
];

angular.module('dugun.popup').controller('DugunPopupCtrl', DugunPopupCtrl);
