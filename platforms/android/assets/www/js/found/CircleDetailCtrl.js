angular.module('starter.CircleDetail',[])
// 个人主页
.controller('CircleDetailCtrl', function($scope,$stateParams,Chats) {
    $scope.img={
      bgImg:"img/bg2.jpg"
    }
    $scope.chat = Chats.get($stateParams.chatId);
    console.log($stateParams.state);
    console.log($stateParams.chatId)
    $scope.state = $stateParams.state;


    
  });