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
        options = {
            templateUrl: options.templateUrl,
            controller: options.controller,
            scope: options.scope,
            keyboard: options.modalOptions.keyboard,
            windowClass: options.modalOptions.windowClass,
            backdrop: options.modalOptions.backdrop,
            size: options.modalOptions.size,
            resolve: {
                itemId: function() { return options.itemId || null; },
                parentId: function() { return options.parentId || null; },
                data: function() { return options.data || null; }
            }
        }

        if(!options.scope){
            delete options.scope;
        }

        var modalInstance = $uibModal.open(options);

        callListener(modalInstance);

        modalInstance.opened.then(function() {
            var html = document.querySelector("html");
            html.style.overflow = "hidden"
        });

         modalInstance.closed.then(function() {
             var html = document.querySelector("html");
             html.style.removeProperty("overflow");
        });

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
