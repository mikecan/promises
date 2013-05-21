define(['PromiseQueue'], function(PromiseQueue) {
    return describe('Handle PromiseQueue operations', function() {
        var promises = [];

        beforeEach(function () {
            var prom1 = $.Deferred(),
                prom2 = $.Deferred(),
                prom3 = $.Deferred();
            promises.push(prom1, prom2, prom3);
        });

        afterEach(function () {
            promises = [];
        });

        describe('Wait for all', function () {
            it('should resolve array of promises', function () {
                var promise;

                promise = PromiseQueue.waitForAll(promises);
                expect('pending').toEqual(promise.state());
                promises.forEach(function (promise) {
                    promise.resolve();
                });
                expect('resolved').toEqual(promise.state());
            });

            it('should reject array of promises', function () {
                var promise;

                promise = PromiseQueue.waitForAll(promises);
                expect('pending').toEqual(promise.state());
                promises.forEach(function (promise, i) {
                    if (i%2 == 1) {
                        promise.reject();
                    }
                    promise.resolve();
                });
                expect('rejected').toEqual(promise.state());
            });

            it('should call done', function () {

            });

            it('should call fail', function () {
            });

            it('should call always', function () {
            });
        });
    });
});
