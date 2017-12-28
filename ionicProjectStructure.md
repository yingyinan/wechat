# ionic项目结构
### 0.目录结构
- 为了方便管理，将html和js文件放置在app文件夹中；
- 在app文件夹中放置tabs.html、app.js、controllers.js、services.js等文件；
- 其余文件按模块分类放置在不同的文件夹中，每个模块中都必须有对应的路由配置(.state.js)，另外可有模块的通用控制器(.controllers.js)、通用服务(.sevices.js)等。
- 每个模块中可按子页面划分，放置在不同的文件夹中，放置对应的页面(.html)、控制器(.controller.js)、服务(.services.js)等
```
www/
    index.html
    lib/ 工具类库
    css/ 自定义样式
        main.css 通用样式
        chats/ 聊天tab页
            chatDetail.css 聊天详情页面样式
            chatInfo.css 聊天信息页面样式
        found/ 发现tab页
        friends/ 通讯录tab页
        me/ 我tab页
    images/ 图片库
        chats/ 聊天tab页图片库
        found/ 发现tab页图片库
        friends/ 通讯录tab页图片库
        me/ 我tab页图片库
    app/ 页面、控制器与服务
        tabs.html tabs页面
        app.js 路由配置
        controllers.js 通用controllers
        services.js 通用services
        directives.js 通用directives
        constants.js 通用constants
        filter.js 通用filters
        auth/ 身份验证模块
        chats/ 聊天tab页模块
            chats.state.js
            tab-chats.html
            tab-chats.controller.js
            tab-chats.service.js
            chatDetail/ 聊天详情
                chatDetail.html 聊天详情页面
                sendLocation.html 发送位置页面
                chatDetail.controller.js 控制器
                chatDetail.service.js 服务
                chatDetail.filter.js 过滤器或其他js
            chatInfo/ 聊天信息
        found/ 发现tab页模块
        friends/ 通讯录tab页模块
        me/ 我tab页模块
        nav/ 导航栏模块
```


-----------------------------------------------------------------

### 1.index.html文件引入

##### 第一步：在index.html中引入app.js、controllers.js、services.js、directives.js等文件
```
    <script src="app/app.js"></script>
    <script src="app/controllers.js"></script>
    <script src="app/services.js"></script>
    <script src="app/directives.js"></script>
```
    
##### 第二步：在index.html中按模块引入所有state、controller、service及其他js文件
```
   <!-- chats -->
    <script src="app/chats/chats.state.js"></script>
    <script src="app/chats/tab-chats.controller.js"></script>
    <script src="app/chats/chatDetail/chatDetail.controller.js"></script>
    <script src="app/chats/chatInfo/chatInfo.controller.js"></script>

    <!-- found -->
    <script src="app/found/found.state.js"></script>
    <script src="app/found/tab-found.controller.js"></script>
    <script src="app/found/friendCircle/friendCircle.controller.js"></script>
    <script src="app/found/circleDetail/circleDetail.controller.js"></script>

    <!-- friend -->
    <script src="app/friends/friends.state.js"></script>
    <script src="app/friends/tab-friends.controller.js"></script>

    <!-- me -->
    <script src="app/me/me.state.js"></script>
    <script src="app/me/tab-me.controller.js"></script>
    <script src="app/me/setting/setting.controller.js"></script>

    <!-- nav -->
    <script src="app/nav/nav.state.js"></script>
    <script src="app/nav/nav.controller.js"></script>
    ...

```


----------------------------------------------------------------------

### 2.app.js模块注入

##### 第一步：命名各个模块
- 在全局通用controllers.js中，将模块命名为starter.controllers
```
(function () {
  'use strict';

  angular
    .module('starter.controllers',[])
    .controller('ShowAnimation', ShowAnimation);

  ShowAnimation.$inject = ['$ionicPopup','$scope','$rootScope','$state','User','$timeout'];

  function ShowAnimation($ionicPopup,$scope,$rootScope,$state,User,$timeout) {...}
})();
```

- 在全局通用services.js中，将模块命名为starter.services
```
(function () {
  'use strict';

  angular
    .module('starter.services', [])
    .service('Chats', Chats)
    .service('Refresh',Refresh)
    .service('User',User);
    
  Chats.$inject = [];
  Refresh.$inject = ['$http','$q'];
  User.$inject = ['$http','$q'];

  function Chats() {...}
  function Refresh($http,$q) {...}
  function User($http,$q) {...}
})();
```

    以此类推，全局通用filters、directives等都写成这样的形式。

- chats.state.js

    在每个被分类的模块中，在.state.js中声明模块，以chats.state.js模块为例，将模块声明为starter.Chats。

    并且在stateConfig函数中配置子路由。

    模块命名规则：
```
    模块名 + .state.js
```

> 特别注意的是，config不需要指定名字，不写成.config('stateConfig',stateConfig)，而写成.config(stateConfig).
```
(function() {
  'use strict';

  angular
    .module('starter.Chats',[])
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('tab.chat-detail', {
      params:{
        "chatId":null,
        "myPosition":null,
      },
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'app/chats/chatDetail/chatDetail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    ...
  }
})();
```
##### 第二步：app.js中注入模块
将第一步中声明好的模块注入到app.js中。

并且在stateConfig函数中配置路由，只配置根路由及各个tab页的路由，其余在各个模块的.state.js中配置

- app.js
```
(function() {
  'use strict';

  angular
    .module('starter',[
      'ionic',
      'ngCordova',
      'starter.controllers',
      'starter.services',
      'starter.directives',
      'starter.Chats',
      'starter.Friends',
      'starter.Found',
      'starter.Me',
      'starter.Nav'
    ])

    .run(stateRun)
    .config(tabConfig)
    .config(stateConfig);

  stateRun.$inject = ['$ionicPlatform','$location','$rootScope','$ionicHistory','$cordovaToast']
  tabConfig.$inject = ['$ionicConfigProvider'];
  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function stateRun($ionicPlatform,$location,$rootScope,$ionicHistory,$cordovaToast){...}

  function tabConfig($ionicConfigProvider) {...}

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // 根
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'app/tabs.html'
    })
    // 聊天列表
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'app/chats/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    // 通讯录 界面
    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'app/friends/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    // 发现 界面
    .state('tab.found', {
      params:{
        "state":null
      },
      url: '/found',
      views: {
        'tab-found': {
          templateUrl: 'app/found/tab-found.html',
          controller: 'FoundCtrl'
        }
      }
    })
    // 我 界面
    .state('tab.me', {
      url: '/me',
      views: {
        'tab-me': {
          templateUrl: 'app/me/tab-me.html',
          controller: 'MeCtrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/tab/chats);
  }
})();
```


----------------------------------------------------------

### 3.各个模块中控制器、服务等js的书写
首先，除.state.js外，所有的js文件命名应继承html的名字，例如:
-   tab-chats.html
-   tab-chats.controller.js
-   tab-chats.service.js

又例如：

-   chatDetail.html
-   chatDetail.controller.js
-   chatDetail.service.js


控制器、服务等js的命名规则：
```
    html名 + .controller.js
    html名 + .service.js
    html名 + .directive.js
    ...
```
其次，只有在路由配置时(.state.js)中才声明模块，需要加中括号用于注入；其余都是调用，不需要加中括号，否则代码报错。
- chats.state.js
```
angular.module('starter.Chats',[])...
```
- tab-chats.controller.js
```
(function () {
  'use strict';

  angular
    .module('starter.Chats')
    .controller('ChatsCtrl', ChatsCtrl);
  ChatsCtrl.$inject = ['$scope','Chats','$ionicPopover'];

  function ChatsCtrl($scope,Chats,$ionicPopover) {...}
})();

```
在service中，一律使用.service，不用.factory
```
angular.module('starter.Chats')
  .service('ChatsCtrl', ChatsCtrl);
  ...
```
在其余的js文件中，也是一样的做法。
