// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
})

// 使tabs位于最底下
.config(['$ionicConfigProvider',function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');// other values: top

  }])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.chat-detail', {
    params:{
      "chatId":null
    },
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  // 搜索界面
  .state('search', {
    params:{"state":null},
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl'
  })


  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'templates/tab-friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })
  .state('tab.friend-info', {
    // params:{
    //   "chatId":null
    // },
    url: '/friends/:chatId',
    views:{
      'tab-friends':{
        templateUrl: 'templates/friendInfo.html',
        controller: 'FriendInfoCtrl'
      }
    }
    })


  .state('tab.found', {
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
      params:{"state":null},
      url: '/friendCircle',
      templateUrl: 'templates/friendCircle.html',
      controller: 'FriendCircleCtrl'
    })
  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'MeCtrl'
      }
    }
  })
  // 设置
  .state('setting', {
    params:{"state":null},
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'SettingCtrl'
  })
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


  // 我的钱包
  .state('wallet', {
    params:{"state":null},
    url: '/wallet',
    templateUrl: 'templates/wallet.html',
    controller: 'WalletCtrl'
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
