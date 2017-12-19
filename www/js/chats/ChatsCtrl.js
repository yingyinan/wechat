angular.module('starter.Chats',[])


// 主页聊天列表
.controller('ChatsCtrl',function($scope,Chats,$ionicPopover) {
  $scope.chats = Chats.all();
  $scope.top = function(chat) {
    Chats.top(chat);
  };
  $scope.remove = function(chat) {
    Chats.remove(chat);
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