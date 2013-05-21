define(['jquery', 'underscore'], function ($, _) {
    return {

        /**
        * Waits for all of the promises to complete.
        * When all promises have been resolved or rejected,
        * calls done() only if all promises were resolved, otherwise fail()
        * with details on which promises failed.
        * Either call is followed by a call to always().
        * @param {Array} promises the jQuery Promise objects to wait for.
        * @returns {Object} jQuery Promise for the async wait action.
        */
        waitForAll:  function (promises) {
            var that = this,
                $deferred = $.Deferred(),
                pending = promises.length,
                rejects = [];

            results = _.map(promises, function (promise) {
                return promise.then(function (value) {
                           return that._resolvedState(this, value);
                        }, function (reason) {
                            rejects.push(that._rejectedState(this, reason));
                        }).always(function () {
                            if (!--pending) {
                                if (rejects.length) {
                                    $deferred.reject(rejects);
                                } else {
                                    $deferred.resolve(results);
                                }
                            }
                        });
            });

            $deferred
                .done(function (value) {
                })
                .fail(function (reason) {
                })
                .always(function () {
                });

            return $deferred.promise();
        },

        /**
         * Makes a result object for the given parameters
         * @param {Object} promise a resolved jQuery Promise
         * @param {Object} value value that resolved the Promise
         * @returns {Object} pojo containing promise and resolved value
         */
        _resolvedState: function (promise, value) {
            return {'promise': promise, 'value': value};
        },

        /**
         * Makes a result object for the given parameters
         * @param {Object} promise a rejected jQuery Promise
         * @param {Object} reason reason for the rejected Promise
         * @returns {Object} pojo containing promise and rejected reason
         */
        _rejectedState: function (promise, reason) {
            return {'promise': promise, 'reason': reason};
        },

        /**
         * Checks array for any rejected promises
         * @param {Array} results array or promises results
         * @returns {Boolen} true if any promises are in rejected state
         */
        _containsRejected: function (results) {
            results.forEach(function (promise) {
                if (promise.state() == 'rejected') {
                   return true;
                }
            });
            return false;
        },

        waitForAll2: function (promises) {
            var $deferred = $.Deferred();

            $.when.apply(null, promises)
                .done(function (result) {
                    $deferred.resolve(result);
                })
                .fail(function (reason) {
                    $deferred.reject(reason);
                })
                .always(function () {
                });

            return $deferred.promise();
        },

        waitForAll3: function (promises) {
            var that = this,
                $deferred = $.Deferred(),
                pending = promises.length,
                results = [], rejects = [];

            promises.forEach(function (promise, i) {
                results[i] = $.when(promise)
                    .fail(function (reason) {
                        rejects.push({
                            'promise': this,
                            'reason': reason
                        });
                    })
                    .always(function () {--pending;});

                if (!pending) {
                    if (rejects.length) {
                        $deferred.reject(rejects);
                    } else {
                        $deferred.resolve(results);
                    }
                }
            });

            $deferred
                .done(function (value) {
                })
                .fail(function (reason) {
                })
                .always(function () {
                });

            return $deferred.promise();
        }
    };
});
