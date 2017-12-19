angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    like:true,
    "circleTime":"7分钟前",
    comment:[{
      name:'ben',
      content:'good job'
    },{
      name:'nancy',
      content:'how are you today'
    }]   
  }, {
    id: 1,
    name: 'Cindy',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    like:false,
    circleTime:"7分钟前",
    comment:[{
      name:'ben',
      content:'good job'
    },{
      name:'nancy',
      content:'how are you today'
    }]  
  },{
    id: 2,
    name: 'Nancy',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    like:false,
    circleTime:"7分钟前",
    comment:[{
      name:'ben',
      content:'good job'
    },{
      name:'nancy',
      content:'how are you today'
    }]  
  },{
    id: 3,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id: 4,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id: 5,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 6,
    name: 'Tommy Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 7,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 8,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    like:false,
    circleTime:"7分钟前",
    comment:[],
  }, {
    id: 9,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 10,
    name: 'Vicky Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 11,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 12,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id:13,
    name: 'Dannie Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id: 14,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id: 15,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id: 16,
    name: 'Orange Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },  {
    id: 17,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }, {
    id: 18,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  } ,{
    id: 19,
    name: 'Linda Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  } ,{
    id: 20,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  },{
    id: 21,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    like:false,
    circleTime:"7分钟前",
    comment:[]
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Refresh',function($http,$q){
  var doRefresh=function(){
    var deferred=$q.defer();
    var promise=deferred.promise;
    $http.get('../json/circleContent.json').success(function (resp) {
      deferred.resolve(resp);
    });
    return promise;    
  }
  return {
    doRefresh:doRefresh
  }
    
})


.factory('User',function($http,$q){
  var login=function(){
    var deferred=$q.defer();
    var promise=deferred.promise;
    $http.get('../json/user.json').success(function (resp) {
      deferred.resolve(resp);
    });
    return promise;    
  }
  return {
    login:login,

  }
    
})

;
