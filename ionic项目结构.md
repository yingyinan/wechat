# ionic项目结构
### 目录结构
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
        constants.js
        filter.js
        chats/ 聊天tab页
            tab-chats.html
            ChatsCtrl.js
            ChatsService.js
            chatDetail/ 聊天详情
                chatDetail.html 页面
                ChatDetailCtrl.js 控制器
                ChatDetailService.js 服务
                ChatDetailFilter.js 过滤器或其他js
            chatInfo/ 聊天信息
        found/ 发现tab页
        friends/ 通讯录tab页
        me/ 我tab页
        login/ 登录界面
        nav/ 导航栏部分

```


### index.html文件引入

##### 第一步：在index.html中引入app.js文件
```
    <script src="app/app.js"></script>
```
    
##### 第二步：在index.html中引入所有controller、service及其他js文件
```
    <script src="app/controllers.js"></script>
    <script src="app/services.js"></script>
    <script src="app/constants.js"></script>
    <script src="app/filter.js"></script>

    <!-- chats -->
    <script src="app/chats/ChatsCtrl.js"></script>
    <script src="app/chats/ChatsService.js"></script>

    <script src="app/chats/chatDetail/ChatDetailCtrl.js"></script>
    <script src="app/chats/chatDetail/ChatDetailService.js"></script>
    <script src="app/chats/chatDetail/ChatDetailFilter.js"></script>

    <script src="app/chats/chatInfo/ChatInfoCtrl.js"></script>
    ...

    <!-- found -->
    <script src="app/found/FoundCtrl.js"></script>
    <script src="app/found/friendCircle/FriendCircleCtrl.js"></script>
    <script src="app/found/circleDetail/CircleDetailCtrl.js"></script>
    ...

    <!-- friend -->
    <script src="app/friends/FriendsCtrl.js"></script>
    ...
    
    <!-- me -->
    <script src="app/me/MeCtrl.js"></script>
    <script src="app/me/setting/SettingCtrl.js"></script>
    ...

```


### app.js注入

##### 第一步：各个js文件中命名模块
- controllers.js
```
    angular.module('starter.controllers',[])
    ...
```
- services.js
```
    angular.module('starter.services', [])
    .factory('Chats', function() {})
    ...
```
- filter.js
```
    angular.module('starter.filter', [])
    .filter('friendFilter', function() {})
    ...
```
- ChatsCtrl.js
```
    angular.module('starter.ChatsCtrl',[])
    .controller('ChatsCtrl',function($scope) {})
    ...
```
- ChatsService.js
```
    angular.module('starter.ChatsService', [])
    .factory('Chats', function() {})
    ...
```
- ChatDetailCtrl.js
```
    angular.module('starter.ChatDetailCtrl',[])
    ...
```

##### 第二步：app.js中注入模块
```
    angular.module('starter', [
        'ionic',
        'ngCordova',
        'starter.controllers',
        'starter.services',
        'starter.filter',
        'starter.ChatsCtrl',
        'starter.ChatsService',
        'starter.ChatDetailCtrl',
        'starter.ChatInfoCtrl',
        'starter.FriendsCtrl',
        'starter.FoundCtrl',
        'starter.FriendCircleCtrl',
        'starter.CircleDetailCtrl',
        'starter.MeCtrl',
        'starter.SettingCtrl',
        ...
    ])

```


### app.js中配置状态机

```
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
// 聊天详情
.state('chatDetail', {
    params:{
        "chatId":null,
        "myPosition":null,   
    },
    url: '/chats/:chatId',
    views: {
        'tab-chats': {
            templateUrl: 'app/chats/chatDetail.html',
            controller: 'ChatDetailCtrl'
        }
    }
})

```