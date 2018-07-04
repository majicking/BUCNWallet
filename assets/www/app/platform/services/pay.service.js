/**
 * Created by lifeng on 2016/1/13.
 */
(function () {
    'use strict';

    /* Services */
    angular.module('app').service('PayService', PayService);

    PayService.$inject = ['$http', '$q'];
    function PayService($http, $q) {
        return {
            alipay: function (total,type,userId,subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/pay/alipay', {
                    total: total,
                    type: type,
                    userId:userId,
                    subAccountType:subAccountType
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
            getPayReturn: function (order_no) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/pay/return', {
                    params: {
                        order_no: order_no
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
            getPayInfo: function (total_fee,code,username) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/pay/wxpay/info', {
                    params: {
                        total_fee: total_fee,
                        code: code,
                        username:username
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