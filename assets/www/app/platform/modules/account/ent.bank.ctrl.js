/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('EntBankCtrl', EntBankCtrl);

    EntBankCtrl.$inject = ['$rootScope','$scope', '$ionicNativeTransitions', '$stateParams', '$ionicLoading', '$sessionStorage','EntService','MstrService'];
    function EntBankCtrl($rootScope,$scope, $ionicNativeTransitions, $stateParams, $ionicLoading, $sessionStorage,EntService,MstrService) {
        var vm = this;
        vm.showPage = false;
        vm.userId = $rootScope.userInfo.userId;

        vm.model = {};

        vm.provinceList = [];
        vm.cityList = [];
        vm.districtList = [];

        vm.save = save;

        vm.inputCard = inputCard;

        vm.provinceChanged = provinceChanged;

        vm.cityChanged = cityChanged;

        getEntBank();

        function inputCard($event){
            vm.model.bankAccountNumber = vm.model.bankAccountNumber.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");;
        }

        function getEntBank(){
            $ionicLoading.show();
            EntService.getEntBank(vm.userId)
                .success(function (data) {
                    vm.provinceList = data.provinceSelect.list;
                    if(data.citySelect){
                        vm.cityList = data.citySelect.list;
                    }
                    if(data.districtSelect){
                        vm.districtList = data.districtSelect.list;
                    }
                    vm.model = data;
                }).error(function(){
            }).finally(function() {
                $ionicLoading.hide();
            });
        }

        function provinceChanged(){
            $ionicLoading.show();
            MstrService.getAreaChildrenList(vm.model.bankProvince)
                .success(function (data) {
                    vm.model.bankCity = null;
                    vm.model.bankDistrict = null;
                    vm.cityList = data.list;
                    vm.districtList = [];
                }).error(function(){
            }).finally(function() {
                $ionicLoading.hide();
            });
        }

        function cityChanged(){
            $ionicLoading.show();
            MstrService.getAreaChildrenList(vm.model.bankCity)
                .success(function (data) {
                    vm.model.bankDistrict = null;
                    vm.districtList = data.list;
                }).error(function(){
            }).finally(function() {
                $ionicLoading.hide();
            });
        }

        function save(){
            var reg = new RegExp("^[0-9]*$");
            if(null==vm.model.bankAccountNumber){
                $scope.$emit('alertWarning', '请填写银行账号');
                return;
            }
            var reg = /^(\d{13}|\d{14}|\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20})$/;
            var tempCard = vm.model.bankAccountNumber.replace(/\s/g,'');
            if(!reg.test(tempCard)){
                $scope.$emit('alertWarning', '银行账号应该为数字');
                return;
            }
            if(null==vm.model.bankName){
                $scope.$emit('alertWarning', '请填写开户银行名');
                return;
            }
            if(null==vm.model.branchName){
                $scope.$emit('alertWarning', '请填写开户支行名');
                return;
            }
            if(null==vm.model.bankUnionCode){
                $scope.$emit('alertWarning', '请填写支行联行号');
                return;
            }
            if(!reg.test(vm.model.bankUnionCode)){
                $scope.$emit('alertWarning', '支行联行号应该为数字');
                return;
            }
            if(null==vm.model.bankProvince){
                $scope.$emit('alertWarning', '请选择开户行所在省');
                return;
            }
            if(null==vm.model.bankCity){
                $scope.$emit('alertWarning', '请选择开户行所在市');
                return;
            }
            if(null==vm.model.bankDistrict){
                $scope.$emit('alertWarning', '请选择开户行所在区');
                return;
            }
            $ionicLoading.show();
            vm.model.bankAccountNumber = tempCard;
            EntService.saveEnvBank(vm.model)
                .success(function (data) {
                    vm.model.isEntBank = data;
                    $rootScope.userInfo.isEntBank = $sessionStorage.userInfo.isEntBank = data;
                    $ionicNativeTransitions.stateGo('tab.manage', {}, {}, {
                        "type": "slide",
                        "direction": "right"
                    });
                }).error(function(){
            }).finally(function() {
                $ionicLoading.hide();
            });
        }
    }
})();

