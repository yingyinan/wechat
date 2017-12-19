angular.module('starter.controllers', [])

// 主页聊天列表
.controller('ChatsCtrl',function($scope,Chats,$ionicPopover) {
  $scope.chats = Chats.all();
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

})

// 聊天详情
.controller('ChatDetailCtrl', function($rootScope,$scope, $stateParams, Chats, $timeout, $ionicScrollDelegate) {
  //   // 默认数据
  // $rootScope.userName='ben';
  // $rootScope.userFace='../img/ben.png';
  // $rootScope.userId='1234';

  $scope.chat = Chats.get($stateParams.chatId);
  // 发消息
    var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    $scope.sendMessage = function() {
      alternate = !alternate;
      var d = new Date();
      d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
      $scope.messages.push({
        userId: alternate ? '12345' : '54321',
        text: $scope.data.message,
        time: d
      });
      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);
    };
  
    $scope.inputUp = function() {
      if (isIOS) $scope.data.keyboardHeight = 216;
      $timeout(function() {
        $ionicScrollDelegate.scrollBottom(true);
      }, 300);
    };
  
    $scope.inputDown = function() {
      if (isIOS) $scope.data.keyboardHeight = 0;
      $ionicScrollDelegate.resize();
    };
  
    $scope.closeKeyboard = function() {
      // cordova.plugins.Keyboard.close();
    };
    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];

})
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

// 通讯录
.controller('FriendsCtrl', function($rootScope,$scope,Chats,$ionicPopover,$stateParams, $location, $ionicScrollDelegate, $log) {
  $rootScope.img={
    addImg:"img/01-add.png",
    chatImg:"img/02-chat.png",
    tabImg:"img/03-tab.png",
    publicImg:"img/04-public.png",
    friendCircleImg:"img/05-friendCircle.png",
    saoyisaoImg:"img/06-saoyisao.png",
    shoppingImg:"img/07-shopping.png",
    gameImg:"img/08-game.png",
    programImg:"img/09-program.png",
    qianbaoImg:"img/11-qianbao.png",
    shoucangImg:"img/12-shoucang.png",
    xiangceImg:"img/13-xiangce.png",
    kabaoImg:"img/14-kabao.png",
    biaoqingImg:"img/15-biaoqing.png",
    shezhiImg:"img/16-shezhi.png",
    erweimaImg:"img/10-erweima.png",
    bgImg:"img/bg.jpg"
  };
  $scope.chats = Chats.all();
  var users=$scope.chats;  
  var log=[];
  $scope.alphabet=iterateAlphabet();
  // 让名字按第一个字母排序
  var tmp={};
  for(var i=0;i<users.length;i++){
    var letter=users[i].name.toUpperCase().charAt(0);
    if(tmp[ letter]==undefined){
      tmp[ letter]=[]
    }
    tmp[ letter].push(users[i]);
  }
  $scope.sorted_users=tmp; 

  // 点击字母显示相应名字的区域
  $scope.gotoList=function(id){
    $location.hash(id);
    $ionicScrollDelegate.anchorScroll();
  }

  // 创建alphabet对象
  function iterateAlphabet(){
    var str="↑☆ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
    var numbers=new Array();
    for(var i=0;i<str.length;i++){
      var nextChar=str.charAt(i);
      numbers.push(nextChar);
    }
    return numbers;
  }
  $scope.groups=[];
  for(var i=0;i<10;i++){
    $scope.groups[i]={
      name:i,
      items:[]
    };
    for(var j=0;j<3;j++){
      $scope.groups[i].items.push(i+'-'+j);
    }
  }

  /*
  * if given group is the selected group, deselect it
  * else, select the given group
  */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
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
})

// 朋友的详细信息
.controller('FriendInfoCtrl',function($scope,$stateParams,Chats){
  
  $scope.chat = Chats.get($stateParams.chatId);

})

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
})

// 我 界面
.controller('MeCtrl', function($rootScope,$scope,$ionicPopover) {

  // // 默认数据
  // $rootScope.userName='ben';
  // $rootScope.userFace='../img/ben.png';
  // $rootScope.userId='1234';

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

// 朋友圈界面
.controller('FriendCircleCtrl', function($rootScope,$scope,$ionicModal,$ionicPopup,Refresh,Chats,$stateParams, $timeout, $ionicScrollDelegate) {
  $scope.img={
    bgImg:"../img/bg.jpg"
  }
  $scope.state = $stateParams.state;
  $scope.chats = Chats.all();
  // 下拉刷新 http
  $scope.doRefresh=function(){
    Refresh.doRefresh().then(function(resp){
      resp.forEach(function(item,index){
        $scope.chats.unshift(item);
      })
    })
  }

  $scope.showKey=false;
  $scope.com=function(){
    $scope.showKey=!$scope.showKey;
  }

  $scope.index=0;
  $scope.getIndex=function(index){
    $scope.index=index;
  }

  // 发动态
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.newContent={};
  $scope.createTrends = function(u) { 
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    console.log(u);
    $scope.chats.unshift({
    id: $rootScope.userId,
    name: $rootScope.userName,
    lastText: u.text,
    face: $rootScope.userFace,
    like:false,
    circleTime:d,
    comment:[]});
    $scope.modal.hide();
    // delete $scope.newContent;
  };
    // //  confirm 对话框
    // $scope.showConfirm = function() {
    //   var confirmPopup = $ionicPopup.confirm({
    //     template: '退出此次编辑?'
    //   });
    //   confirmPopup.then(function(res) {
    //     if(res) {
    //       $scope.modal.hide();
    //       // doReset();
    //       // delete $scope.newContent.text;
    //     }else{
    //       // doReset();          
    //     }
    //   });
    // };
    // 清除input框中的文本
    // function doReset(){  
    //   for(i=0;i<document.tags("input").length;i++){  
    //     if(document.tags("input")[i].type=="text"){  
    //         console.log("input中还有字，我要让它消失");
    //         document.tags("input")[i].value="";  
    //     }  
    //   }  
    // } 
  


  // 评论
  var alternate,
  isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendComment = function() {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    $scope.chats[$scope.index].comment.push({
      name:$rootScope.userName,
      content:$scope.comment.content,
      time:d
    });
    delete $scope.comment.content;
    $scope.showKey=false;
  };

  $scope.closeInput=function(){
    if($scope.showKey==true){
      $scope.showKey=false;    
    }
    delete $scope.comment.content;
  }
  
})


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


  
})

// 登录
.controller('LoginCtrl',function($scope,$rootScope,$state,User,$timeout){
  // $state.go("login",{},{reload:true})                 

  $scope.login=function(id,password){

    var item={
      id: "admin",
      name: "admin",
      password:"admin",    
      lastText: "今天天气不错",
      face: "img/admin.jpg",
      like:"true",
      circleTime:"7分钟前",
      comment:[]
    }
    // var loginState;
    // User.login().then(function(resp){
      // resp.forEach(function(item,index){
        if(id===item.id && password===item.password){
            $state.go('tab.chats');
            $rootScope.userName=item.name;
            $rootScope.userId=item.id;
            $rootScope.userFace=item.face;
            // loginState="login";
            // console.log("true",loginState);
        }else{
            // loginState="";
            // console.log("false",loginState);
        }        
        
      // });
        // console.log("out",loginState);
        // if(loginState!="login"){
        //   alert("用户名或密码不正确"); 
        // // }else{
        //   // alert("登录成功");
        // }


    // })

  }



})

// 钱包
.controller('WalletCtrl', function($scope,$http,$stateParams) {
  $scope.state = $stateParams.state;
  
})






// 聊天框组件
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})



;