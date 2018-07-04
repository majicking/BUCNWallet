/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('ForgotCtrl', ForgotCtrl);
    ForgotCtrl.$inject = ['$rootScope', '$scope', '$interval', '$ionicLoading', '$state', 'UserService', '$translate', '$ionicNativeTransitions'];
    function ForgotCtrl($rootScope, $scope, $interval, $ionicLoading, $state, UserService, $translate, $ionicNativeTransitions) {
        var vm = this;
        vm.password = '';
        vm.phone = '';
        vm.code = '';
        vm.captcha = '';
        vm.reCaptcha = '';
        vm.captchaBtn = {
            disabled: false,
            label: $translate.instant('forgot.get_code')
        };
        vm.forgot = forgot;
        vm.getCaptcha = getCaptcha;
        vm.getCode = getCode;
        getCode();
        function getCode() {
            vm.codeUrl = 'http://www.bucncoin.com/api/authcode/index?t=' + new Date().getTime();
        }

        function forgot() {
            if (vm.phone == null
                || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_your_phone_number'));
                return;
            }
            var re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', $translate.instant('register.incorrect_phone_number_format'));
                return;
            }
            if (vm.captcha == null
                || $.trim(vm.captcha) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_the_dynamic_code'));
                return;
            }
            if (vm.password == null
                || $.trim(vm.password) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_input_password'));
                return;
            }
            re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (!re.test(vm.password)) {
                $scope.$emit('alertWarning', $translate.instant('register.incorrect_password_format'));
                return;
            }
            $ionicLoading.show();
            UserService.forgot(
                vm.password,
                vm.phone,
                vm.captcha,
                vm.reCaptcha
            ).success(function (data) {
                vm.clearForm();
                $ionicLoading.hide();
                $ionicNativeTransitions.stateGo('login', {}, {}, {
                    "type": "slide",
                    "direction": "down"
                });
            }).error(function (error) {
                $ionicLoading.hide();
            });
        }
        var timePromise;
        var second = 180;

        function getCaptcha(verifyPhone) {
            if (vm.code == null
                || $.trim(vm.code) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_verification_code'));
                return;
            }
            if (vm.phone == null
                || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_your_phone_number'));
                return;
            }
            var re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', $translate.instant('register.incorrect_phone_number_format'));
                return;
            }
            UserService.getCaptcha(vm.phone, verifyPhone, vm.code).success(function (data) {
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

        function initCaptchaButton() {
            vm.captchaBtn.disabled = false;
            vm.captchaBtn.label = $translate.instant('register.get_code');
            second = 180;
            $interval.cancel(timePromise);
        }

        function changeCaptchaButton() {
            vm.captchaBtn.disabled = true;
            vm.captchaBtn.label = $translate.instant('register.resend') + "(" + second + ")";
            second--;
        }
    }
})();