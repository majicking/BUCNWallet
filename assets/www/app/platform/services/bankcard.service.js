/**
 * Created by lifeng on 2016/1/13.
 */
(function () {
    'use strict';

    /* Services */
    angular.module('app').service('BankCardService', BankCardService);

    BankCardService.$inject = ['$http', '$q'];
    function BankCardService($http, $q) {
        return {
            getBankCardList: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/bankcard', {
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
            getBankCard: function (userId,id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/bankcard/'+id, {
                    params: {
                        id: id,
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
            getBindBankInfo: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/bind-info', {
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
            addBankCard: function (model) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/bankcard', model)
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
            getProvinceList: function (bankCode) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/province', {
                    params: {
                        bankCode: bankCode
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
            getCityList: function (bankCode,province) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/city', {
                    params: {
                        bankCode: bankCode,
                        province: province
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
            getBankInfoList: function (bankCode,city) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/bank-info', {
                    params: {
                        bankCode: bankCode,
                        city: city
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
            useBankCard: function (userId,id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://www.bucncoin.com/api/bankcard/use', {
                    userId: userId,
                    id:id
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
            remove: function (userId,id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.delete('http://www.bucncoin.com/api/bankcard/'+id, {
                    params: {
                        userId: userId,
                        id:id
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
            }
        }
    }
})();