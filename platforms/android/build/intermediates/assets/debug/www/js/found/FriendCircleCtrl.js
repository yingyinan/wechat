angular.module('starter.FriendCircle',[])
// 朋友圈界面
.controller('FriendCircleCtrl', function($cordovaGeolocation,$cordovaImagePicker,$rootScope,$ionicPopover,$cordovaCapture,$cordovaCamera,$scope,$ionicModal,$ionicPopup,Refresh,Chats,$stateParams,$state,$cordovaCamera,$timeout, $ionicScrollDelegate) {
    $scope.img={
      bgImg:"img/bg.jpg"
    }
    $scope.state = $stateParams.state;
    $scope.chats = Chats.all();
  
    // 更换封面浮动框
    $scope.popover2 = $ionicPopover.fromTemplateUrl('change-popover.html', {
      scope: $scope
    });
    // .fromTemplateUrl() 方法
    $ionicPopover.fromTemplateUrl('change-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover2 = popover;
    });
    $scope.openChangePopover = function($event) {
      $scope.popover2.show($event);
    };
    $scope.closeChangePopover = function() {
      $scope.popover2.hide();
    };
  
  
    // 下拉刷新 http
    $scope.doRefresh=function(){
      Refresh.doRefresh().then(function(resp){
        resp.forEach(function(item,index){
          $scope.chats.unshift(item);
        })
      })
    }
  
    // 
    $scope.showKey=false;
    $scope.com=function(){
      $scope.showKey=!$scope.showKey;
    }
  
    $scope.index=0;
    $scope.getIndex=function(index){
      $scope.index=index;
    }
  
    
  
    // 发动态模态框
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
      $scope.newContent={};
      $scope.imgSrc=[];
      $scope.limit=true;  
      $scope.vShow=true;  
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
      //当我们用完模型时，清除它！没用哦，要在打开之前把$scope.newContent={}
    // $scope.$on('$destroy', function() {
    //   $scope.modal.remove();
    // });
  
    $scope.imgSrc=[];  
     // 调用摄像头拍照片
    $scope.takephoto=function(){
      console.log(1);
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
        // var image = document.getElementById('myImage');
        // image.src=imageData;
        // $scope.imgSrc=imageData;
        console.log(imageData);
  
        // 拍摄图片
        $scope.imgSrc.push(imageData);
        console.log("$scope.imgSrc",$scope.imgSrc);
        
              // 看看是不是有九张图啦
              if($scope.imgSrc.length>9){
                // alert("只能添加9张照片");
                $scope.imgSrc=$scope.imgSrc.slice(0,9);
                console.log($scope.imgSrc);
              }
              if($scope.imgSrc.length==9){
                console.log("$scope.imgSrc",$scope.imgSrc);
                console.log("$scope.imgSrc.length",$scope.imgSrc.length);
                $scope.limit=false;
              }else{
                $scope.limit=true;  
              }
  
              // 如果选择的是图片，视频按钮隐藏
              var patt= /[^\s]+\.(mp4|rmvb|flv|mpeg|avi)/i;
              // console.log($scope.chats[index]);
              if(patt.test(imageData)==false){
                $scope.vShow=false;
              }else{
                $scope.vShow=true;              
              }
  
        // image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
        // CommonJs.AlertPopup(err.message);
      });
      
      
      //图片上传upImage（图片路径）
      //http://ngcordova.com/docs/plugins/fileTransfer/  资料地址
      // var upImage = function (imageUrl) {
        //   document.addEventListener('deviceready', function () {
          //       var url = "img/circle";
          //       var options = {};
          //       $cordovaFileTransfer.upload(url, imageUrl, options)
      //         .then(function (result) {
        //             alert(JSON.stringify(result.response));
        //             alert("success");
        //             alert(result.message);
        //         }, function (err) {
          //             alert(JSON.stringify(err));
      //             alert(err.message);
      //             alert("fail");
      //         }, function (progress) {
        //             // constant progress updates
      //         });
      
      //   }, false);
      
    };
  
    // 拍摄视频
    $scope.captureVideo = function() {
      var options = { limit: 3, duration: 15 };
      console.log(3);
      console.log("options",options);
      $cordovaCapture.captureVideo(options).then(function(videoData) {
        // var image = document.getElementById('myImage');
        // image.src=videoData[0].fullPath;
        console.log("videoData",videoData);
        var i, path, len;
        
          for (i = 0, len = videoData.length; i < len; i += 1) {
             path = videoData[i].fullPath;
             console.log(path);
             console.log("拍视频中的videoData[i].fullPath",videoData[i].fullPath);
          }
          $scope.imgSrc.push(path);
          console.log("拍视频中的imgSrc",$scope.imgSrc);
          $scope.limit=false;
  
      }, function(err) {
        // console.log(err);
      });
    }
    
    // 在本地获取多张照片
    $scope.selectphoto = function(){
      var options = {
        maximumImagesCount: 9-$scope.imgSrc.length, //需要显示的图片的数量
        width: 800,
        height: 800,
        quality: 100
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          console.log("results",results);
          for (var i = 0; i < results.length; i++) {
            if(i%2 == 0){
              console.log('Image URI: ' + results[i]);
              // 选择多张图片
             $scope.imgSrc.push(results[i]);
            }
            // 看看是不是有九张图啦
            if($scope.imgSrc.length>9){
              // alert("只能添加9张照片");
              $scope.imgSrc=$scope.imgSrc.slice(0,9);
              console.log($scope.imgSrc);
            }
            if($scope.imgSrc.length==9){
              console.log("$scope.imgSrc",$scope.imgSrc);
              console.log("$scope.imgSrc.length",$scope.imgSrc.length);
              $scope.limit=false;
            }else{
              $scope.limit=true;  
            }
  
          }
          // 如果选择的是图片，视频按钮隐藏
          var patt= /[^\s]+\.(mp4|rmvb|flv|mpeg|avi)/i;
          // console.log($scope.chats[index]);
          if(patt.test(results[0])==false){
            $scope.vShow=false;
          }else{
            $scope.vShow=true;              
          }
  
        }, function(error) {
         // error getting photos
        });
    }
  
  
    // 在本地选取视频
    $scope.selectVideo=function(){
      console.log(2);
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
        // targetWidth: 200,                                        
          //照片宽度
        // targetHeight: 200,                                       
          //照片高度
        mediaType:1,                                             
          //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
        // cameraDirection:0,                                       
          //枪后摄像头类型：Back= 0,Front-facing = 1
        popoverOptions: CameraPopoverOptions,
        // saveToPhotoAlbum: true                                   
          //保存进手机相册
      };
      
      $cordovaCamera.getPicture(options).then(function(imageData) {
        // var image = document.getElementById('myImage');
        // image.src=imageData;
        // $scope.imgSrc=imageData;
  
        console.log(imageData);
        $scope.imgSrc.push(imageData);
        
  
        // 如果选择的是视频文件，按钮隐藏
        var patt= /[^\s]+\.(mp4|rmvb|flv|mpeg|avi)/i;
        // console.log($scope.chats[index]);
        if(patt.test(imageData)){
          $scope.limit=false;
        }
  
      }, function(err) {
        // error
      });
  
    };
  
    // 移除已添加的照片
    $scope.removePhoto=function(data,a){
      data.forEach(function(item,index){
        if(a==item){
          $scope.imgSrc.splice(index,1);
        }
      })
      if($scope.imgSrc.length==9){
        console.log("$scope.imgSrc",$scope.imgSrc);
        console.log("$scope.imgSrc.length",$scope.imgSrc.length);
        $scope.limit=false;
      }else{
        $scope.limit=true;  
      } 
      // 如果data为空，所有按钮显示
      console.log("data",data);
      if($scope.imgSrc.length==0){
        $scope.vShow=true;              
      }else{
        $scope.vShow=false;     
      }
  
    }
  
    // 获取定位
    $scope.got=false;
    $scope.got2=false;
    $scope.got3=false;
    $scope.myGeoPostion = "所在位置"; 
    // 不显示
    $scope.notLocate=function(){
      $scope.got=false;  
      $scope.got2=false;
      $scope.got3=false; 
      $scope.myGeoPostion = "所在位置"; 
      $scope.Geo=""; 
    } 
    $scope.getlocation=function(){
      $scope.got=!$scope.got;
      $scope.got2=true;
      $scope.got3=true;
      // if($scope.got==false){
      //   $scope.myGeoPostion = "所在位置";
      //   $scope.Geo="";
      // }
      console.log($scope.got);
      var map = new BMap.Map("container"); //实例化一个地图对象
      var point = new BMap.Point(116.331398,39.897445); //设置地图中心的位置
      map.centerAndZoom(point,12); //设置地图元素的可视层
      
      map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
      
      function myFun(result){
          var cityName = result.name;
          map.setCenter(cityName);
          // $scope.myGeoPostion=cityName;
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
           $scope.myGeoPostion=address;
          //  用来传给新数组
           $scope.Geo=address;
          
      
           //画图
           var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)});
            marker.setLabel(label);
           });
      });
    }
  
    // 完事具备只欠发布~
    $scope.createTrends = function(u) { 
      var d = new Date();
      d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
      console.log(u);
      $scope.newContent={
        id: $rootScope.userId,
        name: $rootScope.userName,
        lastText: u.text,
        face: $rootScope.userFace,
        circleImg:$scope.imgSrc,
        like:false,
        circleTime:d,
        geo:$scope.Geo,
        comment:[]};
      $scope.chats.unshift($scope.newContent);
    };
  
    // 显示位置
    $scope.geoShow=true;
    // console.log($scope.geoModel);
    // if($scope.geoModel=="所在位置"){
    //   $scope.geoShow=false;
    // }else{
    //   $scope.geoShow=true;    
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
  
  
    if($scope.showKey==true){
      $scope.closeInput=function(){
        if($scope.showKey==true){
          $scope.showKey=false;
        }
        delete $scope.comment.content;
      }
    }
  
    // 复制或删除 评论
    $scope.index1=0;
    $scope.getIndex1=function(index){
      $scope.index1=index;
    }
  
    $scope.index2=0;
    $scope.getIndex2=function(index){
      $scope.index2=index;
    }
     $ionicPopover.fromTemplateUrl('copyOrDelete.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });
    $scope.openPopover = function($event,name) {
      if(name==$scope.userName){
        $scope.popover.show($event);
      }
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    $scope.delete=function(){
      $scope.chats[$scope.index1].comment.splice($scope.index2,1)
    }
  
    // 删除我的动态
    $scope.deleteMine=function(chat,index){
      $scope.chats.splice(index,1);
      // console.log(chat,index);
    }
  
    //显示视频或图片
    $scope.showVideo=false;
    $scope.showVideo=function(index){
      var patt= /[^\s]+\.(mp4|rmvb|flv|mpeg|avi)/i;
      // console.log($scope.chats[index]);
      if(patt.test($scope.chats[index].circleImg)){
        return true;
      }
    }
  
    $scope.showPhoto=false;
    $scope.showPhoto=function(index){
      var patt= /[^\s]+\.(mp4|rmvb|flv|mpeg|avi)/i;
      // console.log($scope.chats[index]);
      if(patt.test($scope.chats[index].circleImg)==false){
        return true;
      }
    }
    
  
     // 打开相册选择背景图片
     $scope.selectBg=function(){
      console.log("bg");
      var options = {
        //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
        quality: 100,                                            
          //相片质量0-100
        destinationType: Camera.DestinationType.FILE_URI,        
          //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,             
          //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        allowEdit: true,                                        
          //在选择之前允许修改截图
        encodingType:Camera.EncodingType.JPEG,                   
          //保存的图片格式： JPEG = 0, PNG = 1
        targetWidth: 800,                                        
          //照片宽度
        targetHeight: 800,                                       
          //照片高度
        mediaType:0,                                             
          //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
        // cameraDirection:0,                                       
          //枪后摄像头类型：Back= 0,Front-facing = 1
        // popoverOptions: CameraPopoverOptions,
        // saveToPhotoAlbum: true                                   
          //保存进手机相册
      };
      
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('bg');
        image.src=imageData;
        $scope.img.bgImg=imageData;
        console.log("imageData拿到了没",imageData);
      }, function(err) {
        // error
      });
  
    };
    
  
  //  点击图片放大
    $scope.bigImage = false;
    $scope.showBigImage = function (imageName,index) {
      console.log(1)
      console.log(imageName);    
      $scope.Url = imageName;
      $scope.bigImage = true;
      console.log(imageName);
      // 点哪张放大哪张
      $scope.myActiveSlide = index;
    };
    $scope.hideBigImage = function () {
      $scope.bigImage = false;
    };
  
    // div窗口自适应屏幕高度
    // var winHeight = document.body.scrollHeight - 24;    // 取窗口高度
    // if (winHeight <= 0) winHeight = 640;   // 初始高度并不总能取出，设默认值
    
    // var myDiv = document.getElementById('sli');   // 动态创建 div
    // console.log(myDiv);
    // myDiv.style.height = winHeight + 'px';      // 设置高度
    // myDiv.setAttribute('height', winHeight);
  
    
  
  
  
  });