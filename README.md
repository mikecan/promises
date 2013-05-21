promises
========

Promise handling class that implements the following function specification.
```js
/**
* Waits for all of the promises to complete.
* When all promises have been resolved or rejected,
* calls done() only if all promises were resolved, otherwise fail()
* with details on which promises failed.
* Either call is followed by a call to always().
* @param {Array} promises the jQuery Promise objects to wait for.
* @returns {Object} jQuery Promise for the async wait action.
*/
waitForAll = function (promises) {};
```
