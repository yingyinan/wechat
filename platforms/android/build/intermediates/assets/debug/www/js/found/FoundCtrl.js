angular.module('starter.Found',[])
// 发现界面
.controller('FoundCtrl', function($scope,$ionicPopover) {
    $scope.settings = {
      enableFriends: true
    };
  
    // 打开浮动框
    $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
      scope: $scope
    });
    // .fromTemplateUrl() 方法
    $ionicPopover.fromTemplateUrl('my-popover.html', {
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
  });