/**
 * @ngdoc overview
 * @memberof dugun.popup
 * @description
 * Popup service for ui.bootstrap.modal
 */
angular.module('dugun.popup', [
    'ui.bootstrap.modal',
]);

/**
 * @ngdoc factory
 * @memberof dugun.popup
 * @name DgPopup
 *
 * @requires ui.boostrap.modal:$uibModal
 * @requires dgPopupConfig
 */
function DgPopup($uibModal, dgPopupConfig) {
    var service = {},
        listener;

    /**
     * @ngdoc method
     * @memberof DgPopup
     * @param options {Object} Options for modal
     * @param options.templateUrl {string} Template URL for modal
     * @param options.controller {string} Controller for modal
     * @param options.itemId {integer=} itemId to pass into modal controller
     * @param options.parentId {integer=} parentId to pass into modal controller
     * @param options.data {Object=} Any extra data you need to pass into modal controller
     * @param options.modalOptions {Object=} Options for bootstrap modal
     * @description
     * Opens a bootstrap modal
     */
    service.openModal = function(options) {
        options = angular.merge({}, dgPopupConfig, options);

        var modalInstance = $uibModal.open({
            backdrop: options.modalOptions.backdrop || 'static',
            size: options.modalOptions.size || 'lg',
            templateUrl: options.templateUrl,
            controller: options.controller,
            windowClass: options.modalOptions.windowClass || '',
            keyboard: options.modalOptions.keyboard,
            resolve: {
                itemId: function() { return options.itemId || null; },
                parentId: function() { return options.parentId || null; },
                data: function() { return options.data || null; }
            }
        });

        callListener(modalInstance);

        return modalInstance;
    };

    /**
     * @ngdoc method
     * @memberof DgPopup
     * @param callback {function} The callback function when a modal is opened
     * @description
     * Callback will be called with modalInstance.opened promise
     */
    service.setListener = function(callback) {
        if(typeof callback === 'function') {
            listener = callback;
        }
        return service;
    };

    /**
     * @ngdoc method
     * @memberof DgPopup
     * @private
     * @param modalInstance {object} Calls the listener with modalInstance.rendered
     * @description
     * Calls the listener if it is set.
     */
    function callListener(modalInstance) {
        if(listener && modalInstance && modalInstance.rendered) {
            listener(modalInstance.rendered);
        }
    }

    return service;
}

DgPopup.$inject = [
    '$uibModal',
    'dgPopupConfig',
];

angular.module('dugun.popup')
    .factory('dgPopup', DgPopup);

/**
 * @ngdoc controller
 * @memberof dugun.popup
 * @name DugunPopupCtrl
 *
 * @requires $scope
 * @requires ui.bootstrap.modal:$uibModalInstance
 */
function DugunPopupCtrl($scope, $uibModalInstance, data) {
    $scope.data = angular.copy(data);

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

angular.module('dugun.popup').constant('dgPopupConfig', {
    modalOptions: {
        backdrop: 'static',
        size: 'lg',
        windowClass: null,
        keyboard: true
    },
    controller: 'DugunPopupCtrl'
});
