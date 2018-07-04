(function () {
    'use strict';

    /* Services */
    angular.module('app').service('AgreementService', AgreementService);

    AgreementService.$inject = ['$http', '$q'];
    function AgreementService($http, $q) {
        return {
            edit:function(model){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://www.bucncoin.com/api/agreement/'+model.id,model)
                    .success(function (message) {
                        deferred.resolve(message.data);
                    }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            get:function(id){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/agreement')
                    .success(function (message) {
                        deferred.resolve(message.data);
                    }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            }
        }
    }
})();
