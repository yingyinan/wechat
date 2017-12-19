angular.module('starter.Me',[])
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

  // 个人信息页面
  .controller('MyInfoCtrl',function($scope,$rootScope,$cordovaCamera){
    // 在本地选取视频
    $scope.selectFace=function(){
      console.log("选脸");
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
        targetWidth: 70,                                        
          //照片宽度
        targetHeight: 70,                                       
          //照片高度
        mediaType:0,                                             
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
  
        console.log("imageData",imageData);
        $rootScope.userFace=imageData;
  
      }, function(err) {
        // error
      });
  
    };
    
  })

  // 修改名字
  .controller('EditNameCtrl',function($scope,$rootScope,$state,$ionicViewSwitcher,$ionicLoading){
    // 修改用户名字
    // 直接使用{{userName}}无法更改，改成对象的形式。
    $scope.user={
      name:$rootScope.userName
    }
    $scope.save=function(){
      console.log("$scope.user.Name",$scope.user.Name);
      $rootScope.userName=$scope.user.name;
      console.log("$rootScope.userName",$rootScope.userName);
      
      
        $ionicLoading.show({  
            template: '正在保存....',  
            template: '<ion-spinner icon="lines" class="ios-small"></ion-spinner>', //替换默认动画  
            duration: 500   //指定显示时长，后自动隐藏  
        });  

      $state.go("myInfo");
      $ionicViewSwitcher.nextDirection("back");
      
    }
  
    
  })

  .controller('ErweimaCtrl',function($scope,$ionicActionSheet,$timeout){
    
    $scope.menu = function() {

        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '换个样式' },
              { text: '保存到手机' },
              { text: '扫描二维码' },
              { text: '重置二维码' },
            ],
            buttonClicked: function(index) {
              return true;
            }
        });

        $timeout(function() {
            hideSheet();
        }, 2000);

    };  
        
  })
  
  ;