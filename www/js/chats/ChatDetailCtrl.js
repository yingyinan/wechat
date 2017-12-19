angular.module('starter.ChatDetail',[])

// 聊天详情
.controller('ChatDetailCtrl', function($cordovaCapture,$ionicPopover,$cordovaCamera,$rootScope,$scope, $stateParams, Chats, $timeout, $ionicScrollDelegate) {
    $scope.chat = Chats.get($stateParams.chatId);
    // 时间
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

// 打开相册选择图片
$scope.sendImg="";
$scope.openAlbum=function(){
  console.log("打开相册选择图片，发送");
  var options = {
    //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
    quality: 100,                                            
      //相片质量0-100
    destinationType: Camera.DestinationType.FILE_URI,        
      //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,             
      //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
    allowEdit: false,                                        
      //在选择之前允许修改截图
    encodingType:Camera.EncodingType.JPEG,                   
      //保存的图片格式： JPEG = 0, PNG = 1
    targetWidth: 400,                                        
      //照片宽度
    targetHeight: 600,                                       
      //照片高度
    mediaType:2,                                             
      //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
    // cameraDirection:0,                                       
      //枪后摄像头类型：Back= 0,Front-facing = 1
    // popoverOptions: CameraPopoverOptions,
    // saveToPhotoAlbum: true                                   
      //保存进手机相册
  }; 
  $cordovaCamera.getPicture(options).then(function(imageData) {
    $scope.sendImg=imageData;
    console.log("imageData拿到了没",imageData);
    console.log("$scope.sendImg拿到了没",$scope.sendImg);

    // 如果选择的是视频，显示视频
    var patt= /[^\s]+\.(mp4|rmvb|flv|mpeg|avi)/i;
    if(patt.test(imageData)){
      $scope.messages.push({
        userId: alternate ? '12345' : '54321',
        time: d,
        video:$scope.sendImg,
        state:"video"
      });
      console.log("$scope.messages",$scope.messages);

      $ionicScrollDelegate.scrollBottom(true);
    }else{

      $scope.messages.push({
        userId: alternate ? '12345' : '54321',
        time: d,
        img:$scope.sendImg,
        state:"img"
      });
      console.log("$scope.messages",$scope.messages);
      $ionicScrollDelegate.scrollBottom(true);
    }
  

    }, function(err) {
      // error
    });

  };


  // 点击拍摄弹出浮动框
  $scope.popover = $ionicPopover.fromTemplateUrl('phoVid-popover.html', {
    scope: $scope
  });
  // .fromTemplateUrl() 方法
  $ionicPopover.fromTemplateUrl('phoVid-popover.html', {
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

  // ==================================================

   // 调用摄像头拍照片
   $scope.takephoto=function(){
    console.log("拍照");
    var options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            
        //相片质量0-100
      destinationType: Camera.DestinationType.FILE_URI,        
        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      sourceType: Camera.PictureSourceType.CAMERA,             
        //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: false,                                        
        //在选择之前允许修改截图
      encodingType:Camera.EncodingType.JPEG,                   
        //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 375,                                        
        //照片宽度
      targetHeight: 667,                                       
        //照片高度
      mediaType:2,                                             
        //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection:0,                                       
        //枪后摄像头类型：Back= 0,Front-facing = 1
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   
        //保存进手机相册
    };
    
    $cordovaCamera.getPicture(options).then(function(imageData) {
      
      $scope.sendImg=imageData;
      console.log("imageData拿到了没",imageData);
      console.log("$scope.sendImg拿到了没",$scope.sendImg);
      
        $scope.messages.push({
          userId: alternate ? '12345' : '54321',
          time: d,
          img:$scope.sendImg,
          state:"img"
        });
        console.log("$scope.messages",$scope.messages);
        $ionicScrollDelegate.scrollBottom(true);

    }, function(err) {
      
    });
  };

  // 拍摄视频
  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };
    console.log("拍摄视频 ");
    console.log("options",options);
    $cordovaCapture.captureVideo(options).then(function(videoData) {
      console.log("videoData",videoData);
      var i, path, len;
      
        for (i = 0, len = videoData.length; i < len; i += 1) {
           path = videoData[i].fullPath;
           console.log(path);
           console.log("拍视频中的videoData[i].fullPath",videoData[i].fullPath);
        }
        $scope.sendImg=path;
        $scope.messages.push({
          userId: alternate ? '12345' : '54321',
          time: d,
          video:$scope.sendImg,
          state:"video"
        });
        console.log("$scope.messages",$scope.messages);
        $ionicScrollDelegate.scrollBottom(true);

    }, function(err) {
      // console.log(err);
    });
  }
  // +++===============================================

    // 发消息
      var alternate,
      isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
      $scope.sendMessage = function() {
        // alternate = !alternate;

        $scope.messages.push({
          userId: alternate ? '12345' : '54321',
          text: $scope.data.message,
          time: d,
          state:"text"
          // img:$scope.sendImg
        });
        delete $scope.data.message;
        delete $scope.sendImg;
        $ionicScrollDelegate.scrollBottom(true);
      };
    
      $scope.inputUp = function() {
        $scope.moreShow=false;
        document.getElementById("b1").style.height="57px";        
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


      // 点击+号选择更多功能
      console.log(document.getElementById("b1").style);
      $scope.moreShow=false;
      
      $scope.a=function(){
        $scope.moreShow=!$scope.moreShow;
        if($scope.moreShow==false){
          document.getElementById("b1").style.height="57px";
        }else{
          document.getElementById("b1").style.height="300px";
        }
      }


      // 获取sendLocation页面返回来的位置信息
      $scope.myPosition=$stateParams.myPosition ;
      
      // 触碰ion-content任何位置关闭
      $scope.closeMore=function(){
        $scope.moreShow=false;
        if($scope.moreShow==false){
          document.getElementById("b1").style.height="57px";
        }else{
          document.getElementById("b1").style.height="300px";        
        }  
        
        // 看看地址传过来了没
        console.log("$stateParams.myPosition",$stateParams.myPosition)
    console.log("$scope.myPosition",$scope.myPosition)
    
      }
      
      // 点击完上一个页面的发送
      if($scope.myPosition!=undefined){
        $scope.messages.push({
          userId: alternate ? '12345' : '54321',
          text: $scope.myPosition,
          time: d,
          state:"text"
          // img:$scope.sendImg
        });
        delete $scope.myPosition;
      }

  
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
  




  // 发送位置
.controller('SendLocationCtrl', function($cordovaGeolocation,$rootScope,$scope,$stateParams,Chats) {
  
  $scope.state = $stateParams.state;
  $scope.chat = Chats.get($stateParams.chatId); 
  
  var map = new BMap.Map("myMap"); //实例化一个地图对象
  var point = new BMap.Point(116.331398,39.897445); //设置地图中心的位置
  map.centerAndZoom(point,12); //设置地图元素的可视层
  
  map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
  map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
  
  function myFun(result){
      var cityName = result.name;
      map.setCenter(cityName);
  }
  var myCity = new BMap.LocalCity();
  myCity.get(myFun);
  
  
  //点击获取坐标
  map.addEventListener("click",function(e){
       //存储经纬度
       lng = e.point.lng;
       lat = e.point.lat;
  
       //在地图上面描点
       var marker = new BMap.Marker(new BMap.Point(lng,lat));  // 创建标注
       map.addOverlay(marker);
       marker.enableDragging();    //可拖拽
  
      var gc = new BMap.Geocoder();
       //获取地址的数据地址
       var pt = e.point;
       gc.getLocation(pt, function(rs){
       var addComp = rs.addressComponents;
       address = addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;
       console.log("addComp",addComp);
       console.log("address",address);
       $scope.myPosition=address;
  
  
       //画图
       var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)});
        marker.setLabel(label);
       });

       
      });
      
      $scope.sendLocation=function(){
         console.log("$scope.myPositon",$scope.myPosition)         
      }       
})
  
  ;