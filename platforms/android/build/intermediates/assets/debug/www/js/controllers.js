angular.module('starter.controllers',[])

// 隐藏tabs
.directive('hideTabs', function ($rootScope) {
  return {
      restrict: 'A',
      link: function (scope, element, attributes) {
          scope.$on('$ionicView.beforeEnter', function () {
              scope.$watch(attributes.hideTabs, function (value) {
                  $rootScope.hideTabs = value;
              });
          });

          scope.$on('$ionicView.beforeLeave', function () {
              $rootScope.hideTabs = false;
          });
      }
  };
})

// 扫一扫 二维码
.controller('BarScanCtrl', function($scope,$stateParams,$cordovaBarcodeScanner,Chats,$state) {
  $scope.state = $stateParams.state;

      $scope.scanResult=[];
      $scope.scanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(imageData){
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
          $scope.scanResult.text=imageData.text;
          $scope.scanResult.format=imageData.format;
          $scope.scanResult.cancelled=imageData.cancelled;
          window.location.href=imageData.text; 
        }, function(error) {
          console.log("An error happened -> " + error);
        });
      };

  
  
})


// 搜索界面
.controller('SearchCtrl', function($scope,Chats,$stateParams,$state) {
  $scope.chats = Chats.all();  
  $scope.chat = Chats.get($stateParams.chatId);  
  console.log($stateParams.state);
  // $scope.state=function(){
  //   $state.go($stateParams.state);
  // };
  $scope.state = $stateParams.state;
  $scope.data={
    criteria:''
  }

})


// 登录
.controller('LoginCtrl',function($ionicPopup,$scope,$rootScope,$state,User,$timeout){
  // $state.go("login",{},{reload:true})                 

  $scope.login=function(id,password){

    // var loginState;
    User.login().then(function(resp){
      $scope.logState="";
      resp.forEach(function(item,index){
        if(id===item.id && password===item.password){
          $rootScope.userName=item.name;
          $rootScope.userId=item.id;
          $rootScope.userFace=item.face;
          $scope.logState=true;
          $state.go('tab.chats');
        }
      });
    }).then(function(){
      if($scope.logState!=true){
        $timeout(function() {
          myPopup=$ionicPopup.alert({
            title: "用户名或密码错误！",
          });
        }, 1000);
        $timeout(function() {
          myPopup.close();
        }, 3000);
      }
    }) 
  }

          

})

// 钱包
.controller('WalletCtrl', function($scope,$http,$stateParams) {
  $scope.state = $stateParams.state;
  
})




;