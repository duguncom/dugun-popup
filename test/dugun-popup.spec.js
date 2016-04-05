describe('dgPopup', function() {
    var $uibModal,
        $templateCache,
        dgPopup,
        listener = {},
        modalInstance,
        modalInstanceMock,
        DugunPopupCtrl,
        scope;

    function setListener() {
        return dgPopup.setListener(listener.func);
    }

    beforeEach(module('dugun.popup'));

    beforeEach(inject(function(_$uibModal_, _dgPopup_, _$templateCache_, $controller, $rootScope){
        $uibModal = _$uibModal_;
        dgPopup = _dgPopup_;

        $templateCache = _$templateCache_;
        $templateCache.put('nothing.html', 'nothing');

        listener.func = function(promise) {
            return true;
        };

        scope = $rootScope.$new();
        modalInstanceMock = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss')
        };

        DugunPopupCtrl = $controller('DugunPopupCtrl', {
            $scope: scope,
            $uibModalInstance: modalInstanceMock
        });

        spyOn(listener, 'func');

        setListener(listener.func);
    }));

    it('sets the listener', function() {
        var returns = setListener(listener.func);
        expect(typeof returns.openModal).toBe('function');
    });

    describe('openModal', function() {
        it('openModal calls the $uibModal.open', function() {
            spyOn($uibModal, 'open');

            var options = {
                templateUrl: 'nothing.html'
            };

            dgPopup.openModal(options);

            expect($uibModal.open).toHaveBeenCalled();
        });

        it('calls the listener with rendered promise', function() {
            var options = {
                templateUrl: 'nothing.html'
            };

            modalInstance = dgPopup.openModal(options);

            expect(listener.func).toHaveBeenCalledWith(modalInstance.rendered);
        });

        it('returns uibModalInstance', function() {
            var expected = [
                'result',
                'opened',
                'closed',
                'rendered',
                'close',
                'dismiss',
            ].sort();

            expect(Object.keys(modalInstance).sort()).toEqual(expected);
        });
    });

    it('close modal', function() {
        var options = {
            templateUrl: 'nothing.html',
            controller: DugunPopupCtrl
        };
        dgPopup.openModal(options);
        scope.close();

        expect(modalInstanceMock.dismiss).toHaveBeenCalled();
    });
});
