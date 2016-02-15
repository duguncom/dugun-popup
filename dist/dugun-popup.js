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
 * CustomerUserPopup factory
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
        options = options || {};
        options.modalOptions = options.modalOptions || {};

        var modalInstance = $uibModal.open({
            backdrop: options.modalOptions.backdrop || 'static',
            size: options.modalOptions.size || 'lg',
            templateUrl: options.templateUrl,
            controller: options.controller,
            windowClass: options.modalOptions.windowClass || '',
            resolve: {
                itemId: function() { return options.itemId || null; },
                parentId: function() { return options.parentId || null; },
                data: function() { return options.data || null; }
            }
        });

        callListener(modalInstance.rendered);

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
     * @param promise {promise} Calls the listener with promise
     * @description
     * Calls the listener if it is set.
     */
    function callListener(promise) {
        if(listener) listener(promise);
    }

    return service;
}

DgPopup.$inject = [
    '$uibModal',
    'dgPopupConfig',
];

angular.module('dugun.popup')
    .factory('dgPopup', DgPopup);

angular.module('dugun.popup').constant('dgPopupConfig', {
    backdrop: 'static',
    size: 'lg',
    windowClass: null
});
