/**
 * Created by lifeng on 2016/1/21.
 */
(function () {
    'use strict';

    /* Services */
    angular.module('app').service('CoinService', CoinService);

    CoinService.$inject = ['$http', '$q'];
    function CoinService($http, $q) {
        return {
            checkAddress: function (address, userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/coin/check/address', {
                    params: {
                        address: address,
                        userId: userId
                    }
                }).success(function (message) {
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
            getSendFromInfo: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/coin/send/from', {
                    params: {
                        userId: userId
                    }
                }).success(function (message) {
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
            sendFrom: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/coin/send/from', input).success(function (message) {
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
            getSendFromResult: function (id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/coin/send/from/result', {
                    params: {
                        id: id
                    }
                }).success(function (message) {
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

            register: function (username, password, phone, captcha , reCaptcha) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/coin/register', {
                    username: username,
                    password: password,
                    phone: phone,
                    captcha: captcha,
                    reCaptcha: reCaptcha
                }).success(function (message) {
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