angular.module('starter.Setting',[])
// 设置
.controller('SettingCtrl', function($scope,$http,$stateParams,$state,$ionicPopover,$timeout,$ionicPopup) {
    $scope.state = $stateParams.state;
  
      // "退出"浮动框
      $scope.popover = $ionicPopover.fromTemplateUrl('exit-popover.html', {
        scope: $scope
      });
      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('exit-popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function($event) {
        $scope.popover.show($event);
      };
      $scope.closePopover = function() {
        $scope.popover.hide();
      };
  
      // 退出当前账号 对话框
      $scope.showConfirm1 = function() {
        var confirmPopup = $ionicPopup.confirm({
          template: '退出后不会删除任何历史数据，下次登录依然可以使用本账号。',
          okText: "退出", 
          okType:"button-clear button-balanced", 
          cancelText:"取消",
          cancelType:"button-clear button-stable", 
        });
        confirmPopup.then(function(res) {
          if(res) {
            // $state.go('login');
            $state.go("login",{},{reload:true})                 
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };
  
       // 确认退出微信
       $scope.showConfirm2 = function() {
        var myPopup = $ionicPopup.show({
          template: '<p>关闭后，你的朋友可能无法及时联系上你，还可能会影响到微信的使用体验。</p><input type="checkbox" style="display:inline;"><span style="font-size="5px;">有新消息时在通知栏提醒</span>',
          // title: '',
          scope: $scope,
          buttons: [
            { 
              text: '取消',
              type: 'button-clear button-stable',        
            },
            {
              text: '关闭微信',
              type: 'button-clear button-balanced',
              onTap: function(e) {
                ionic.Platform.exitApp();
                console.log('关闭微信');
                // navigator.app.exitApp();
                // ionic.Platform.exitApp();
              }
            },
          ]
        });
        // myPopup.then(function(res) {
        //   console.log('Tapped!', res);
        // });
        // $timeout(function() {
        //    myPopup.close(); // 3秒后关闭弹窗
        // }, 3000);
      }
    
  })
  
  // 新消息设置
  .controller('NewCtrl', function($scope,$http,$stateParams) {
    $scope.state = $stateParams.state;
    
    $scope.newOneChange = function() {
      console.log('Change newOne', $scope.newOne.checked);
    };
    $scope.newOne = { checked: true };
  
    $scope.newTwoChange = function() {
      console.log('Change newTwo', $scope.newTwo.checked);
    };
    $scope.newTwo = { checked: true };
  
    $scope.newThreeChange = function() {
      console.log('Change newThree', $scope.newThree.checked);
    };
    $scope.newThree = { checked: true };
  
    $scope.newFourChange = function() {
      console.log('Change newFour', $scope.newFour.checked);
    };
    $scope.newFour = { checked: true };
  
    $scope.newFiveChange = function() {
      console.log('Change newFive', $scope.newFive.checked);
    };
    $scope.newFive = { checked: true };
  
    $scope.newSixChange = function() {
      console.log('Change newSix', $scope.newSix.checked);
    };
    $scope.newSix = { checked: true };
  
    $scope.newSevenChange = function() {
      console.log('Change newSeven', $scope.newSeven.checked);
    };
    $scope.newSeven = { checked: true };
  
  
    
  });
  