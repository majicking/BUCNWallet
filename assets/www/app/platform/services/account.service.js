(function () {
    'use strict';

    /* Services */
    angular.module('app').service('AccountService', AccountService);

    AccountService.$inject = ['$http', '$q'];
    function AccountService($http, $q) {
        return {
            getTradeListLength: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/get/trade/list/length', {
                    params: {
                        userId: userId,
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
            getTimes: function () {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/get/times', {
                    params: {
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
            getQrcode: function (userId) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get('http://www.bucncoin.com/api/account/get/qrcode', {
                params: {
                    userId: userId,
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
            getConnectState: function () {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/get/connect/state', {
                    params: {
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
            getTradeInfo: function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get('http://www.bucncoin.com/api/account/get/trade/info', {
                params: {
                    id: id,
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
            getBalance: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/get/balance', {
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
            getTradeList: function (currentPage,itemsPerPage,criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/get/trade/list', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
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
            getUserGraph: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/graph', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
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
            getPaymentSeqlist: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/payment/list', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
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
            getBillList: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/bill', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
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
            getUserIdsFromCededBill: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/ceded/userIds', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getAsset: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/asset', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getCode: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/code', {
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
            getAccountInfo: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/info', {
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
            //refreshUser: function (userId) {
            //    var deferred = $q.defer();
            //    var promise = deferred.promise;
            //    $http.get('http://www.bucncoin.com/api/user/genGrade', {
            //        params: {
            //            userId: userId
            //        }
            //    }).success(function (message) {
            //        deferred.resolve(message);
            //    }).error(function (error) {
            //        deferred.reject(error);
            //    });
            //    promise.success = function (fn) {
            //        promise.then(fn);
            //        return promise;
            //    };
            //    promise.error = function (fn) {
            //        promise.then(null, fn);
            //        return promise;
            //    };
            //    return promise;
            //},
            getWithdrawInfo: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/withdraw', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            withdraw: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/account/withdraw', input).success(function (message) {
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
            getWithdrawResult: function (id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/withdraw/result', {
                    params: {
                        id: id,
                        subAccountType: subAccountType
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
            getTransferInfo: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/transfer', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            transfer: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/account/transfer', input).success(function (message) {
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
            getCededInfo: function (userId, id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/ceded', {
                    params: {
                        userId:userId,
                        id: id,
                        subAccountType: subAccountType
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
            getCededList: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/ceded/list', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
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
            ceded: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/account/ceded', input).success(function (message) {
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
            getCededResult: function (id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/ceded/result', {
                    params: {
                        id: id,
                        subAccountType: subAccountType
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
                $http.get('http://www.bucncoin.com/api/account/pay/info', {
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
            },
            imgUpload: function (userId,imgAddr) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://www.bucncoin.com/api/account/img/upload', {
                    userId: userId,
                    imgAddr: imgAddr
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
            saveBankUsed: function (userId, bankTypeValue) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://www.bucncoin.com/api/account/used/save', {
                    userId: userId,
                    bankTypeValue: bankTypeValue
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
            getRollOutInfo: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/roll/out', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            rollOut: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://www.bucncoin.com/api/account/roll/out', input).success(function (message) {
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
            getRollOutResult: function (id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://www.bucncoin.com/api/account/roll/out/result', {
                    params: {
                        id: id,
                        subAccountType: subAccountType
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
        }
    }
})();