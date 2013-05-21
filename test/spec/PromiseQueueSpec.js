define(['PromiseQueue'], function (PromiseQueue) {
    return describe('Handle PromiseQueue operations', function () {
        describe('Wait for all', function () {
            var deferreds = [];

            beforeEach(function () {
                var prom1 = $.Deferred(),
                    prom2 = $.Deferred(),
                    prom3 = $.Deferred();
                deferreds = [];
                deferreds.push(prom1, prom2, prom3);
            });

            it('should resolve array of deferreds', function () {
                var promise;

                promise = PromiseQueue.waitForAll(deferreds);
                expect('pending').toEqual(promise.state());
                deferreds.forEach(function (deferred) {
                    deferred.resolve();
                });
                expect('resolved').toEqual(promise.state());
            });

            it('should reject array of deferreds', function () {
                var promise;

                promise = PromiseQueue.waitForAll(deferreds);
                expect('pending').toEqual(promise.state());
                deferreds.forEach(function (deferred) {
                    deferred.reject();
                });
                expect('rejected').toEqual(promise.state());
            });


           it('should resolve with values', function () {
                var promise;

                promise = PromiseQueue.waitForAll(deferreds);
                deferreds.forEach(function (deferred) {
                    deferred.resolve('You rock!');
                });
                expect('resolved').toEqual(promise.state());
                promise.done(function (results) {
                    results.forEach(function (result) {
                        expect(result.value).toEqual('You rock!');
                    });
                });
            });

            it('should reject with reasons', function () {
                var promise;

                promise = PromiseQueue.waitForAll(deferreds);
                deferreds.forEach(function (deferred) {
                    deferred.reject('Too slow joe.');
                });
                expect('rejected').toEqual(promise.state());
                promise.fail(function (rejects) {
                    rejects.forEach(function (reject) {
                        expect(reject.reason).toEqual('Too slow joe.');
                    });
                });
            });
            it('should call done', function () {
                var promise,
                    doneSpy = jasmine.createSpy();

                promise = PromiseQueue.waitForAll(deferreds);
                promise.done(function () {
                    doneSpy();
                });
                deferreds.forEach(function (deferred) {
                    deferred.resolve();
                });
                expect(doneSpy).toHaveBeenCalled();
            });

            it('should call fail', function () {
                var promise,
                    failSpy = jasmine.createSpy();

                promise = PromiseQueue.waitForAll(deferreds);
                promise.fail(function () {
                    failSpy();
                });
                deferreds.forEach(function (deferred) {
                    deferred.reject();
                });
                expect(failSpy).toHaveBeenCalled();
            });

            it('should not call done', function () {
                var promise,
                    doneSpy = jasmine.createSpy();

                promise = PromiseQueue.waitForAll(deferreds);
                promise.done(function () {
                    doneSpy();
                });
                deferreds.forEach(function (deferred) {
                    deferred.reject();
                });
                expect(doneSpy).not.toHaveBeenCalled();

            });

            it('should not call fail', function () {
                var promise,
                    failSpy = jasmine.createSpy();

                promise = PromiseQueue.waitForAll(deferreds);
                promise.fail(function () {
                    failSpy();
                });
                deferreds.forEach(function (deferred) {
                    deferred.resolve();
                });
                expect(failSpy).not.toHaveBeenCalled();
            });

            it('should call always after resolve', function () {
                var promise,
                    alwaysSpy = jasmine.createSpy();

                promise = PromiseQueue.waitForAll(deferreds);
                promise.always(function () {
                    alwaysSpy();
                });
                deferreds.forEach(function (deferred) {
                    deferred.resolve();
                });
                expect('resolved').toEqual(promise.state());
                expect(alwaysSpy).toHaveBeenCalled();
            });

            it('should call always after reject', function () {
                var promise,
                    alwaysSpy = jasmine.createSpy();

                promise = PromiseQueue.waitForAll(deferreds);
                promise.always(function () {
                    alwaysSpy();
                });
                deferreds.forEach(function (deferred) {
                    deferred.reject();
                });
                expect('rejected').toEqual(promise.state());
                expect(alwaysSpy).toHaveBeenCalled();
            });
        });

        describe('Resolved state helper', function () {
            it('should return accepted pojo', function () {
                var $deferred = $.Deferred(),
                    resolved;
                $deferred.resolve('You rock!');
                resolved = PromiseQueue._resolvedState($deferred.promise(), 'You rock!');
            });
        });

        describe('Rejected state helper', function () {
            it('should return rejected pojo', function () {
            
            });
        });
    });
});
