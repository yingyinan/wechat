// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers', 'starter.services','starter.Chats','starter.ChatDetail','starter.ChatInfo','starter.Friends','starter.Found','starter.FriendCircle','starter.CircleDetail','starter.Me','starter.Setting'])

.run(function($ionicPlatform,$location,$rootScope,$ionicHistory,$cordovaToast) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  $ionicPlatform.registerBackButtonAction(function (e) {
      //判断处于哪个页面时双击退出
      if ($location.path() == '/login' || $location.path() == '/tab/main' ) {
          if ($rootScope.backButtonPressedOnceToExit) {
              ionic.Platform.exitApp();
          } else {
              $rootScope.backButtonPressedOnceToExit = true;
              $cordovaToast.showShortBottom('再按一次退出系统');
              setTimeout(function () {
                  $rootScope.backButtonPressedOnceToExit = false;
              }, 2000);
          }
      }
      else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
      } else {
          $rootScope.backButtonPressedOnceToExit = true;
          $cordovaToast.showShortTop('再按一次退出系统')
              .then(function(success) {
                  // success
                  alert("'success");
              }, function (error) {
                  // error
                  alert("error");
              });
          setTimeout(function () {
              $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
      }
      e.preventDefault();
      return false;
  }, 101);



})

// 使tabs位于最底下
.config(['$ionicConfigProvider',function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');// other values: top

  }])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // 搜索界面
  .state('search', {
    params:{"state":null},
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl'
  })

  // 根
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // 聊天列表
  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  // 聊天框
  .state('tab.chat-detail', {
    params:{
      "chatId":null,
      "myPosition":null,
    },
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })
  // 发送位置
  .state('sendLocation', {
    params:{
      "chatId":null,
      "myPosition":null,
    },
    url: '/chats/:chatId/sendLocation',
    cache:'false',
    templateUrl: 'templates/sendLocation.html',
    controller: 'SendLocationCtrl'
  })
  // 聊天信息
  .state('tab.chat-info', {
    params:{
      "chatId":null
    },
    url: '/chats/info/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-info.html',
        controller: 'ChatInfoCtrl'
      }
    }
  })

  // 通讯录
  .state('tab.friends', {
    url: '/friends',
    // cache: true,
    views: {
      'tab-friends': {
        templateUrl: 'templates/tab-friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })

  // 详细资料
  .state('tab.friend-info', {
    params:{
      "chatId":null,
      "state":null
    },
    url: '/friends/:chatId',
    views:{
      'tab-friends':{
        templateUrl: 'templates/friendInfo.html',
        controller: 'FriendInfoCtrl'
      }
    }
    })

    // 发现界面
  .state('tab.found', {
    params:{
      "state":null
    },
    url: '/found',
    views: {
      'tab-found': {
        templateUrl: 'templates/tab-found.html',
        controller: 'FoundCtrl'
      }
    }
  })

  // 朋友圈
  .state('friendCircle', {
    params:{"state":null,"chatId":null},
    url: '/friendCircle',
    templateUrl: 'templates/friendCircle.html',
    controller: 'FriendCircleCtrl'
  })
  // 朋友圈个人详细界面
  .state('circle-detail', {
    params:{
      "chatId":null,
      "state":null
    },
    url: '/circleDetail/:chatId',
    templateUrl: 'templates/circle-detail.html',
    controller: 'CircleDetailCtrl'
  })
  // 更换封面
  .state('changeBg', {
    url: '/friendCircle/changeBg',
    templateUrl: 'templates/changeBg.html',
    controller: 'FriendCircleCtrl'
  })


  //二维码
  .state('barScan', {
    params:{"state":null},
    url: '/tab/barScan',
    templateUrl: 'templates/barScan.html',
    controller: 'BarScanCtrl'
  })

    // 我 界面
  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'MeCtrl'
      }
    }
  })
  // 个人信息
  .state('myInfo', {
    params:{"state":null},
    url: '/myInfo',
    templateUrl: 'templates/myInfo.html',
    controller: 'MyInfoCtrl'
  })
  // 修改昵称
  .state('editName', {
    params:{"state":null},
    url: '/myInfo/editName',
    templateUrl: 'templates/editName.html',
    controller: 'EditNameCtrl'
  })
  // 二维码名片
  .state('erweima', {
    params:{"state":null},
    url: '/myInfo/erweima',
    templateUrl: 'templates/qrCode.html',
    controller: 'ErweimaCtrl'
  })
  // 我的钱包
  .state('wallet', {
    params:{"state":null},
    url: '/wallet',
    templateUrl: 'templates/wallet.html',
    controller: 'WalletCtrl'
  })
  // 设置
  .state('setting', {
    params:{"state":null},
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'SettingCtrl'
  })
  // 设置新消息blabla
  .state('setting-new', {
    params:{"state":null},
    url: '/setting/new',
    templateUrl: 'templates/settingNew.html',
    controller: 'NewCtrl'
  })

  // 登录界面
  .state('login', {
    params:{"state":null},
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })



  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
