angular.module('starter.Friends',[])
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
      if(tmp[letter]==undefined){
        tmp[letter]=[]
      }
      tmp[letter].push(users[i]);
    }
    console.log("tmp",tmp);
    function objKeySort(obj) {//排序的函数
        var newkey = Object.keys(obj).sort();
    　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj;//返回排好序的新对象
    }
    $scope.sorted_users=objKeySort(tmp); 
  
    // 点击字母显示相应名字的区域
    $scope.gotoList=function(id){
      $scope.selected=id;
      $location.hash('index_'+id);
      $ionicScrollDelegate.anchorScroll();
      console.log('index_'+id);
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
    $scope.state = $stateParams.state;  
    $scope.chat = Chats.get($stateParams.chatId);
  
  });