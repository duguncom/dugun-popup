# dugun-popup
It's a service to control all bootstrap modals from one service.

# Usage
Install and save it in bower.json.

    bower install --save dugun-popup

Add it as a dependency to your module

    angular.module('myApp', ['dugun.popup']);

Add it as a dependency to your controller and use it!

    function MyCtrl(dgPopup) {
        dgPopup.openModal({
            templateUrl: 'url-to-your-template.html',
            controller: 'MyModalCtrl',
            itemId: 4909, // Optional parameter to your modal controller
            parentId: 141, // Optional parameter to your modal controller
            data: { name: 'Ege' }, // Optional parameter to your modal controller
            modalOptions: {
                backdrop: 'static',
                size: 'sm'
            } // Optional. ui.bootstrap.modal options
        }); // It returns what $uibModal returns.
    }

    MyCtrl.$inject = [
        'dgPopup',
    ];

    angular.module('myApp').controller('MyCtrl', MyCtrl);

You can also set a listener if you use a library like angular-busy.

    dgPopup.setListener(function(promise) {
        $scope.loadingModal = promise;
    });

    <div cg-busy="loadingModal"></div>
