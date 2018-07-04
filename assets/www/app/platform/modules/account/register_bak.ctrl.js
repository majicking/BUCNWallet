/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$rootScope', '$scope','$stateParams','$interval', '$ionicLoading','$ionicPopup', '$state', 'UserService'];
    function RegisterCtrl($rootScope, $scope,$stateParams,$interval, $ionicLoading,$ionicPopup, $state, UserService) {
        var vm = this;
        var referralCode = $stateParams.referralCode;
        vm.username = '';
        vm.password = '';
        vm.repassword = '';
        vm.paypassword = '';
        vm.repaypassword = '';
        if(referralCode){
            vm.referralCode = referralCode;
        }else{
            vm.referralCode = '';
        }
        vm.phone = '';
        vm.code = '';
        vm.captcha = '';
        vm.reCaptcha = '';
        vm.captchaBtn = {
            disabled: false,
            label: '获取动态码'
        };

        getCode();

        vm.register = register;
        vm.clearForm = clearForm;
        vm.getCaptcha = getCaptcha;
        vm.getCode = getCode;

        function getCode(){
            vm.codeUrl = 'http://www.bucncoin.com/api/authcode/index?t='+new Date().getTime();
        }

        function register() {
            var re = null;
            // if (vm.username == null || $.trim(vm.username) == '') {
            //     $scope.$emit('alertWarning', '请输入用户名');
            //     return;
            // }
            // if (vm.username.length<6||vm.username.length>20) {
            //     $scope.$emit('alertWarning', '用户名长度不正确');
            //     return;
            // }
            // if (!((/^[A-Za-z0-9\u4e00-\u9fa5_-]+$/.test(vm.username) && !/^\d+$/.test(vm.username)))) {
            //     $scope.$emit('alertWarning', '用户名格式不正确');
            //     return;
            // }
            // if (/^ZRJA\d+$/.test(vm.username.toUpperCase())) {
            //     $scope.$emit('alertWarning', '用户名已被占用');
            //     return;
            // }
            if (vm.password == null || $.trim(vm.password) == '') {
                $scope.$emit('alertWarning', '请输入密码');
                return;
            }
            re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (!re.test(vm.password)) {
                $scope.$emit('alertWarning', '密码格式不正确');
                return;
            }
            if (vm.repassword == null || $.trim(vm.repassword) == '') {
                $scope.$emit('alertWarning', '请再次输入密码');
                return;
            }

            if (vm.password!=vm.repassword) {
                $scope.$emit('alertWarning', '俩次密码不一致');
                return;
            }
            
            if (vm.paypassword == null || $.trim(vm.paypassword) == '') {
                $scope.$emit('alertWarning', '请输入交易密码');
                return;
            }
            if (!re.test(vm.paypassword)) {
                $scope.$emit('alertWarning', '交易密码格式不正确');
                return;
            }

            if (vm.repaypassword == null || $.trim(vm.repaypassword) == '') {
                $scope.$emit('alertWarning', '请再次输入交易密码');
                return;
            }

            if (vm.paypassword!=vm.repaypassword) {
                $scope.$emit('alertWarning', '俩次交易密码不一致');
                return;
            }
            if (vm.paypassword==vm.password) {
                $scope.$emit('alertWarning', '交易密码和密码不能一样');
                return;
            }
            if (vm.phone == null || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', '请输入手机号');
                return;
            }
            re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', '手机号格式不正确');
                return;
            }
            if (vm.captcha == null || $.trim(vm.captcha) == '') {
                $scope.$emit('alertWarning', '请输动态码');
                return;
            }
            $ionicLoading.show();
            UserService.register(
                vm.username,
                vm.password,
                vm.paypassword,
                vm.referralCode,
                vm.phone,
                vm.captcha,
                vm.reCaptcha
            ).success(function (data) {
                vm.clearForm();
                $state.go('login');
            }).error(function (error) {
            }).finally (function(){
                $ionicLoading.hide();
            });
        //     if(vm.referralCode == null || $.trim(vm.referralCode) == ''){
        //         vm.showConfirm = function() {
        //             var confirmPopup = $ionicPopup.confirm({
        //                 title: '确认',
        //                 template: '<div class="text-center">确认您没有推荐人吗?</div>',
        //                 cancelText: '否',
        //                 okText: '是'
        //             });
        //
        //             confirmPopup.then(function(res) {
        //                 if(res) {
        //                     $ionicLoading.show();
        //                     UserService.register(
        //                         vm.username,
        //                         vm.password,
        //                         vm.paypassword,
        //                         vm.referralCode,
        //                         vm.phone,
        //                         vm.captcha,
        //                         vm.reCaptcha
        //                     ).success(function (data) {
        //                         vm.clearForm();
        //                         $state.go('login');
        //                     }).error(function (error) {
        //                     }).finally (function(){
        //                         $ionicLoading.hide();
        //                     });
        //                 }
        //             });
        //         };
        //         vm.showConfirm();
        //     }else{
        //         $ionicLoading.show();
        //         UserService.validateCode(
        //             vm.referralCode
        //         ).success(function (message) {
        //             if(message.code==1){
        //                 var confirmPopup = $ionicPopup.confirm({
        //                     title: '确认',
        //                     template: '<div class="text-center">您的推荐人是'+message.data+'?</div>',
        //                     cancelText: '否',
        //                     okText: '是'
        //                 });
        //                 confirmPopup.then(function(res) {
        //                     if(res) {
        //                         $ionicLoading.show();
        //                         UserService.register(
        //                             vm.username,
        //                             vm.password,
        //                             vm.referralCode,
        //                             vm.phone,
        //                             vm.captcha,
        //                             vm.reCaptcha
        //                         ).success(function (data) {
        //                             vm.clearForm();
        //                             $state.go('login');
        //                         }).error(function (error) {
        //                         }).finally (function(){
        //                             $ionicLoading.hide();
        //                         });
        //                     }
        //                 });
        //             }else{
        //                 $scope.$emit('alertWarning', message.message);
        //             }
        //         }).error(function (error) {
        //         }).finally (function(){
        //             $ionicLoading.hide();
        //         });
        //     }
        }

        var timePromise;
        var second = 180;

        function getCaptcha(verifyPhone) {
            // if (vm.code == null || $.trim(vm.code) == '') {
            //     $scope.$emit('alertWarning', '请输入验证码');
            //     return;
            // }
            var re = null;
            if (vm.phone == null || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', '请输入手机号');
                return;
            }
            re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', '手机号格式不正确');
                return;
            }
            UserService.getCaptcha(vm.phone, verifyPhone,"0").success(function (data) {
                vm.reCaptcha = data;
                changeCaptchaButton();
                timePromise = $interval(function () {
                    if (second == 0) {
                        initCaptchaButton(timePromise);
                    } else {
                        changeCaptchaButton();
                    }
                }, 1000);
            });
        }

        function clearForm() {
            vm.username = '';
            vm.password = '';
            vm.referralCode = '';
            vm.code = '';
            vm.phone = '';
            vm.captcha = '';
            vm.reCaptcha = '';
        }

        function initCaptchaButton() {
            vm.captchaBtn.disabled = false;
            vm.captchaBtn.label = '获取动态码';
            second = 180;
            $interval.cancel(timePromise);
        }

        function changeCaptchaButton() {
            vm.captchaBtn.disabled = true;
            vm.captchaBtn.label = "重新发送(" + second + ")";
            second--;
        }
    }
})();