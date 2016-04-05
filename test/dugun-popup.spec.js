describe('dgPopup', function() {
    var $uibModal,
        $templateCache,
        dgPopup,
        listener = {},
        modalInstance;

    function setListener() {
        return dgPopup.setListener(listener.func);
    }

    beforeEach(module('dugun.popup'));

    beforeEach(inject(function(_$uibModal_, _dgPopup_){
        $uibModal = _$uibModal_;
        dgPopup = _dgPopup_;

        listener.func = function(promise) {
            return true;
        };

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
                templateUrl: 'nothing.html',
                controller: ''
            };

            modalInstance = dgPopup.openModal(options);

            expect(listener.func).toHaveBeenCalledWith(modalInstance.rendered);
        });

        it('returns uibModalInstance', function() {
            expect(modalInstance.rendered.constructor.name).toBe('Promise');
        });

    });
});
