/**
 * Created by lifeng on 2016/1/19.
 */
(function () {
    'use strict';

    /* Controllers */

    angular.module('app').controller('PatternSetting', PatternSetting);
    PatternSetting.$inject = ['$stateParams', '$rootScope', '$scope', '$state', '$ionicPopover','$ionicLoading', 'PatternService', '$ionicPopup','$cordovaScanning', '$translate'];
    function PatternSetting($stateParams, $rootScope, $scope, $state, $ionicPopover,$ionicLoading, PatternService, $ionicPopup,$cordovaScanning, $translate) {
        var uuid = 'pc' ;
        // function ID(){
        //     document.addEventListener("deviceready", function () {
        //         // $cordovaFile.getFreeDiskSpace()
        //         //     .then(function (success) {
        //         //         // success in kilobytes
        //         //     }, function (error) {
        //         //         // error
        //         //     });
        //         console.info('123');
        //         // console.log(device.cordova);
        //         var device = $cordovaDevice.getDevice();
        //         //
        //         var cordova = $cordovaDevice.getCordova();
        //         //
        //         var model = $cordovaDevice.getModel();
        //         //
        //         var platform = $cordovaDevice.getPlatform();
        //         //
        //         uuid = $cordovaDevice.ID();
        //         return uuid;
        //         //
        //         // var version = $cordovaDevice.getVersion();
        //
        //     }, false);
        // }


        var vm = this;
        vm.c_srcPassMsg = false;         //是否显示请输入原密码
        vm.c_settingPassMsg = false;    //是否显示输入密码时的设置提示信息
        vm.c_changePattern = false;     //是否显示修改密码按钮
        vm.c_showPattern = false;       //是否显示手势密码面板
        vm.isChangePattern = false;     //是否正在修改手势密码
        vm.isUsedFlag = false;          //是否使用手势密码
        vm.isHavePattern = false;       //是否已经存在手势密码
        vm.checkSrcPattern = false;     //原密码校验是否通过
        var fPattern,sPattern;
        vm.model={
            uuid:uuid,
            pattern:'',
            createUser:$rootScope.userInfo.userId,
            isCurrent:'1',
            isUsed:'0'
        }

        vm.btn_change_msgs = $translate.instant('pattern_setting.modify_pattern_password');
        vm.setting_msgs = [$translate.instant('pattern_setting.modify_pattern_new_password'), $translate.instant('pattern_setting.modify_pattern_new_password_again'), $translate.instant('pattern_setting.diff')];
        vm.setting_index = 0;

        vm.on_off_change = on_off_change;
        vm.changePattern = changePattern;

        initPatternPage();

        function initPatternPage(){
            vm.model.createUser = $rootScope.userInfo.userId;
            $cordovaScanning.commont("devices", "").then(function (uuid) {
                PatternService.getPatternByUUID(uuid)
               //PatternService.getPatternByUUID('111111')
                .success(function (data) {
                    if(data == null){
                        vm.c_settingPassMsg = false;
                        vm.isHavePattern = false;
                    }else{
                        vm.c_changePattern = true;
                        vm.c_settingPassMsg = false;
                        vm.c_srcPassMsg = false;
                        vm.isUsedFlag = true;
                        vm.isHavePattern = true;
                    }
                    vm.model.uuid = uuid;
                })
                .error(function () {
                });
            });
        }


        function on_off_change(){
            vm.model.createUser = $rootScope.userInfo.userId;
            if(vm.isUsedFlag){
                vm.model.isUsed = '1';
                if(vm.isHavePattern){
                    vm.c_changePattern = true;
                    vm.c_showPattern = false;
                    vm.c_settingPassMsg = false;
                    vm.c_srcPassMsg = false;
                }else{
                    vm.c_changePattern = false;
                    vm.c_showPattern = true;
                    vm.c_settingPassMsg = true;
                    vm.c_srcPassMsg = false;
                }
            }else{
                vm.model.isUsed = '0';
                vm.c_changePattern = false;
                vm.c_settingPassMsg = false;
                vm.c_srcPassMsg = false;
                vm.c_showPattern = false;
                vm.btn_change_msgs = $translate.instant('pattern_setting.modify_pattern_password');
                vm.checkSrcPattern = false;
                vm.setting_index = 0;
                vm.isChangePattern = false;
            }
            PatternService.patternUpdateUsed(vm.model)
                .success(function (data) {
                })
                .error(function () {
                });
        }

        function changePattern(){
           // $scope.$apply(function () {
                if(!vm.isChangePattern){ //开始修改密码
                    vm.isChangePattern = true;
                    vm.c_srcPassMsg = true;
                    vm.c_showPattern = true;
                    vm.c_settingPassMsg = false;
                    vm.btn_change_msgs = $translate.instant('pattern_setting.modify_pattern_password_cancel');
                }else{
                    vm.isChangePattern = false;
                    vm.c_srcPassMsg = false;
                    vm.c_showPattern = false;
                    vm.c_settingPassMsg = false;
                    vm.btn_change_msgs = $translate.instant('pattern_setting.modify_pattern_password');
                    vm.checkSrcPattern = false;
                    vm.setting_index = 0;
                }
            //});
        }

        vm.change_index = 0;
        function modifyPattern(pattern){
            vm.model.pattern = pattern;
            vm.model.createUser = $rootScope.userInfo.userId;
            if(vm.change_index == 0){
                PatternService.checkPattern(vm.model)
                    .success(function (data) {
                        if(data.checkFlag){
                            vm.model.isUsed = '1';
                            vm.c_srcPassMsg = false;
                            vm.c_settingPassMsg = true;
                            vm.checkSrcPattern = true;
                        }else{
                            var alertPopup = $ionicPopup.alert({
                                title: $translate.instant('pattern_setting.wrong'),
                                template: '<div class="f f-ac f-c text-center">' + $translate.instant('pattern_setting.diff_old') +'</div>',
                                okText:$translate.instant('pattern_setting.confirm'),
                                okType:'button-positive'
                            });
                            // alertPopup.then(function(res) {
                            //     vm.isHavePattern = true;
                            // });
                        }
                    })
                    .error(function () {
                    });
            }
        }

        function clearController(){
            vm.isChangePattern = false;
            vm.c_srcPassMsg = false;
            vm.c_showPattern = false;
            vm.c_settingPassMsg = false;
            vm.btn_change_msgs = $translate.instant('pattern_setting.modify_pattern_password');
            vm.checkSrcPattern = false;
            vm.setting_index = 0;
            //vm.c_changePattern = false;
        }

        // 2
        var lock = new PatternLock('#lockPattern', {
            //allowRepeat : true,   //点可以重复
            // radius:23,            //圆大小
            margin:20,            //圆间距
            //matrix:[4,4],         //不同的矩阵模式
            //lineOnMove:true,      //线是否跟着手势移动
            //patternVisible:false, //滑动时，轨迹是否显示
            //delimiter:'&',        //数值间分割符
            onDraw:function(pattern){
                if(pattern.length>=4){
                    $scope.$apply(function () {
                        if(vm.isChangePattern && !vm.checkSrcPattern){ //正在修改密码
                            modifyPattern(pattern);
                        }else{ //设置初始密码
                            if(vm.setting_index == 0 || vm.setting_index == 2){
                                vm.setting_index = 1;
                                fPattern = pattern;
                            }else if(vm.setting_index == 1){
                                sPattern = pattern;
                                if(fPattern == sPattern){
                                    //保存 手势密码
                                    vm.model.createUser = $rootScope.userInfo.userId;
                                    vm.model.pattern = sPattern;
                                    $cordovaScanning.commont("devices", "").then(function (data) {
                                        vm.model.uuid  = data;
                                        //vm.model.uuid  = '111111';
                                        vm.model.isUsed = '1';
                                        PatternService.patternAdd(vm.model)
                                            .success(function (data) {
                                                // $scope.$emit('alertWarningCallBack', '手势密码已经保存',function(){
                                                //     vm.isHavePattern = true;
                                                //     clearController();
                                                // });
                                                var alertPopup = $ionicPopup.alert({
                                                    title: $translate.instant('pattern_setting.success'),
                                                    template: '<div class="f f-ac f-c text-center">' + $translate.instant('pattern_setting.confirmd') + '</div>',
                                                    okText:$translate.instant('pattern_setting.confirm')
                                                });
                                                alertPopup.then(function(res) {
                                                    vm.isHavePattern = true;
                                                    clearController();
                                                    vm.c_changePattern = true;
                                                });

                                            })
                                            .error(function () {
                                            });
                                    });
                                }else{
                                    vm.setting_index = 2;
                                }
                            }
                        }
                        lock.reset();
                    });
                }else{
                    $scope.$emit('alertWarningCallBack', $translate.instant('pattern_setting.request') ,function(){
                        lock.reset();
                    });
                }



                // 4
                // if ($scope.log_pattern) {
                //     // 5
                //     LoginService.checkLoginPattern(pattern).success(function(data) {
                //         lock.reset();
                //         $state.go('tab.dash');
                //     }).error(function(data) {
                //         lock.error();
                //     });
                // } else {
                //     // 6
                //     LoginService.setLoginPattern(pattern);
                //     lock.reset();
                //     $scope.log_pattern = LoginService.getLoginPattern();
                //     $scope.$apply();
                // }
            }
        });
        // lock.checkForPattern('12369',function(){
        //     alert("You unlocked your app");
        // },function(){
        //     alert("Pattern is not correct");
        // });
    }
})();