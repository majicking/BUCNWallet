/**
 * Created by lifeng on 2016/1/13.
 */
(function () {
    'use strict';

    /* Services */
    angular.module('app').service('UserService', UserService);

    UserService.$inject = ['$http', '$q'];
    function UserService($http, $q) {
        return {
            login: function (username, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/login', {
                    username: username,
                    password: password
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
            forgot: function (password, phone, captcha , reCaptcha) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/forgot', {
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
            },
            loginForQiYe: function (username, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/qiye/login', {
                    username: username,
                    password: password
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
            forgotForQiYe: function (username,password, phone, captcha , reCaptcha) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/qiye/forgot', {
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
            },
            loginForWechat: function (code) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/wechat/login', {
                    code: code
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
            validateCode: function (referralCode) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/validate/referralCode', {
                    referralCode: referralCode
                }).success(function (message) {
                    deferred.resolve(message);
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
            validateUsername: function (username) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/validate/username', {
                    username: username
                }).success(function (message) {
                    deferred.resolve(message);
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
            verifyForQiYe: function (userId, name,idCard,bizCredentialName,bizLicenseNo) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/qiye/verify', {
                    userId: userId,
                    name: name,
                    idCard:idCard,
                    bizCredentialName:bizCredentialName,
                    bizLicenseNo:bizLicenseNo
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
            verify: function (userId, name,idCard) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/verify', {
                    userId: userId,
                    name: name,
                    idCard:idCard
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
            addPaymentPw: function (userId, paymentPw) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/payment', {
                    userId: userId,
                    paymentPw: paymentPw
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
            getCaptcha: function (phone,verifyPhone,code) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/captcha', {
                    phone: phone,
                    verifyPhone: verifyPhone,
                    code: code
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
            changePassword: function (userId, oldPassword, newPassword) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/password', {
                    userId: userId,
                    oldPassword: oldPassword,
                    newPassword: newPassword
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
            changePayment: function (userId, oldPassword, newPassword) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/repayment', {
                    userId: userId,
                    oldPassword: oldPassword,
                    newPassword: newPassword
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
            bindAccount: function (username, password,openId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://www.bucncoin.com/api/user/binding', {
                    username: username,
                    password: password,
                    openId:openId
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
            getWechatInfo: function (code) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/user/wechat', {
                    params: {
                        code: code
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
            addReferralCode: function (userId, referralCode) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/referral', {
                    userId: userId,
                    referralCode: referralCode,
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
            validateReferralCode: function (referralCode,userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/validate/referral', {
                    referralCode: referralCode,
                    userId: userId
                }).success(function (message) {
                    deferred.resolve(message);
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
            validateCmCode: function (cmCode,userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/validate/agent', {
                    cmCode: cmCode,
                    userId: userId
                }).success(function (message) {
                    deferred.resolve(message);
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
            addCmCode: function (userId, cmCode) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/agent', {
                    userId: userId,
                    cmCode: cmCode
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
            checkPatternNoLogin:function(uuid, loginPattern){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/user/checkPatternNoLogin',{
                    params: {
                        uuid: uuid,
                        loginPattern: loginPattern
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
            isHavePattern:function(uuid){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/user/isHavePattern',{
                    params: {
                        uuid: uuid
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
            mobile: function (userId, phone, captcha , reCaptcha, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/user/mobile', {
                    userId: userId,
                    phone: phone,
                    captcha: captcha,
                    reCaptcha: reCaptcha,
                    password: password
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