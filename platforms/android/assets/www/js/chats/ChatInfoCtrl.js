angular.module('starter.ChatInfo',[])
// 聊天信息详情
.controller('ChatInfoCtrl', function($rootScope,$scope, $stateParams, Chats, $timeout, $ionicScrollDelegate) {
    $scope.chat = Chats.get($stateParams.chatId);
    $scope.newOneChange = function() {
      console.log('Change newOne', $scope.newOne.checked);
    };
    $scope.newOne = { checked: true };
  
    $scope.newTwoChange = function() {
      console.log('Change newTwo', $scope.newTwo.checked);
    };
    $scope.newTwo = { checked: true };
  });