(function () {
    'use strict';

    /**
     * Config for the router
     */
    angular.module('app')
        .run(
            ['$state','$rootScope', '$sessionStorage',
                function ($state, $rootScope, $sessionStorage) {
                    if(!$sessionStorage.userInfo){
                        $sessionStorage.userInfo = {};
                    }
                    $rootScope.userInfo = $sessionStorage.userInfo;

                    if(!$sessionStorage.isLogged){
                        $sessionStorage.isLogged = false;
                    }
                    $rootScope.isLogged = $sessionStorage.isLogged;

                    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                        if(toState.name!='tab.manage-pay'&&toState.name!='wechat'&&toParams.code&&toState.name!='tab.account-pay-result'){
                            if(toState.name != 'binding'&&toState.name != 'register'){
                                event.preventDefault();
                                $sessionStorage.userInfo = {};
                                $rootScope.userInfo = $sessionStorage.userInfo;
                                $sessionStorage.isLogged = false;
                                $rootScope.isLogged = $sessionStorage.isLogged;
                                //if(toState.name != 'tab.manage-pay'){
                                    $state.go('wechat',{code:toParams.code,state:toState.name});
                                //}
                                //else{
                                //    $state.go('wechat',{qrcode:toParams.qrcode,code:toParams.code,state:toState.name});
                                //}
                            }
                        }else{
                            if(toState.name != 'password-gesture'&&toState.name != 'agreement'&&toState.name != 'login'&&toState.name != 'register'&&toState.name != 'forgot'&&toState.name != 'qiye-login'&&toState.name != 'qiye-forgot'){
                                if(!$sessionStorage.isLogged){
                                    if(toState.name!='wechat'){
                                         event.preventDefault();
                                         $state.go('login');
                                    }
                                }else{
                                    //if($sessionStorage.userInfo.isTrustName==0&&toState.name != 'verify'&&toState.name != 'qiye-verify'){
                                    //    event.preventDefault();
                                    //    $state.go('verify');
                                    //}else if($sessionStorage.userInfo.isNomalBank==0&&$sessionStorage.userInfo.userType=='0'&&$sessionStorage.userInfo.isQiYe=='0'&&(toState.name == 'tab.account-withdraw' || toState.name =='tab.account-roll-out')){
                                    //    event.preventDefault();
                                    //    alertWarning('请先绑定银行卡');
                                    //    $state.go('tab.manage-bankcard-add');
                                    //}else if($sessionStorage.userInfo.isNomalBank==0&&$sessionStorage.userInfo.bankUsed!=null&&$sessionStorage.userInfo.bankUsed.split(':')[0]=='0'&&$sessionStorage.userInfo.userType=='1'&&(toState.name == 'tab.account-withdraw' || toState.name =='tab.account-roll-out')){
                                    //    event.preventDefault();
                                    //    alertWarning('请先绑定银行卡');
                                    //    $state.go('tab.manage-bankcard-add');
                                    //}else if($sessionStorage.userInfo.isEntBank==0&&$sessionStorage.userInfo.bankUsed!=null&&$sessionStorage.userInfo.bankUsed.split(':')[0]=='1'&&$sessionStorage.userInfo.userType=='1'&&(toState.name == 'tab.account-withdraw' || toState.name =='tab.account-roll-out')){
                                    //    event.preventDefault();
                                    //    alertWarning('请先绑定企业账户');
                                    //    $state.go('tab.manage-ent-bank');
                                    //}else if($sessionStorage.userInfo.isEntBank==0&&$sessionStorage.userInfo.userType=='0'&&$sessionStorage.userInfo.isQiYe=='1'&&(toState.name == 'tab.account-withdraw' || toState.name =='tab.account-roll-out')){
                                    //    event.preventDefault();
                                    //    alertWarning('请先绑定企业账户');
                                    //    $state.go('tab.manage-ent-bank');
                                    //}else if($sessionStorage.userInfo.bankUsed==null&&$sessionStorage.userInfo.userType=='1'&&(toState.name == 'tab.account-withdraw' || toState.name =='tab.account-roll-out')){
                                    //    event.preventDefault();
                                    //    alertWarning('请先选择要使用账户类型');
                                    //    $state.go('tab.manage');
                                    //}else if($sessionStorage.userInfo.isPayment==0&&toState.name == 'tab.account'){
                                    //    event.preventDefault();
                                    //    $state.go('payment');
                                    //}
                                    if($sessionStorage.userInfo.isPayment==0&&toState.name == 'tab.account'){
                                            event.preventDefault();
                                            $state.go('payment');
                                    }
                                }
                            }
                        }
                    });
                }
            ]
        )

    function alertWarning(text,lv){
        $(".warningBox").remove();
        if(lv==null){
            lv = "";
        }
        var warningBox = createDiv("warningBox fixTop "+lv, text);
        $(warningBox).addClass("fadeOut")
        warningBox.addEventListener("webkitAnimationEnd", function () {
            $(this).remove();
        })
    }

    function createDiv(className, innerHTML) {
        var oDiv = document.createElement("div");
        oDiv.className = className;
        if (innerHTML) {
            oDiv.innerHTML = innerHTML
        }
        document.body.appendChild(oDiv);
        return oDiv;
    }
})();