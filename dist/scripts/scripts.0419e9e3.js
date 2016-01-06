"use strict";angular.module("upstreamApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngFileUpload","ngMaterial","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider","$httpProvider","$mdThemingProvider",function(a,b,c){a.when("/",{templateUrl:"views/catch.html",controller:"CatchCtrl",controllerAs:"catch"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/catch",{templateUrl:"views/catch.html",controller:"CatchCtrl",controllerAs:"catch"}).when("/upload",{templateUrl:"views/upload.html",controller:"UploadCtrl"}).when("/user/:userId",{templateUrl:"views/user.html",controller:"UserCtrl"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl"}).when("/registration",{templateUrl:"views/registration.html",controller:"RegistrationCtrl"}).otherwise({redirectTo:"/"}),b.interceptors.push("AuthInterceptor"),c.theme("default").primaryPalette("blue").accentPalette("orange")}]),angular.module("upstreamApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("upstreamApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("upstreamApp").factory("AuthInterceptor",["$injector","$location","$q","$window",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},d.sessionStorage.token&&(a.headers.Authorization=d.sessionStorage.token),a},responseError:function(a){return(401===a.status||"/login"!==a.config.url)&&b.path("/login"),c.reject(a)}}}]),angular.module("upstreamApp").controller("LoginCtrl",["$scope","loginService","$location","$http","$resource","$window",function(a,b,c,d,e,f){a.username="",a.password="";({username:a.username,password:a.password});a.loginUser=function(){a.login=b.save({username:a.username,password:a.password},function(a){var b="token "+a.token;d.defaults.headers.common.Authorization=b,f.sessionStorage.token=b,c.path("/")})}}]),angular.module("upstreamApp").factory("loginService",["$resource",function(a){var b=a("http://162.243.237.149/api-token-auth/");return b}]),angular.module("upstreamApp").controller("CatchCtrl",["$scope","catchService","userService","$resource","Upload","$routeParams","$timeout",function(a,b,c,d,e,f,g){a.uploadPic=function(b){b.upload=e.upload({url:"http://162.243.237.149/api/catches",data:{fishPhoto:b,title:a.title}}),b.upload.then(function(c){g(function(){b.result=c.data,console.log(c.data),a.catches.push(c.data)})},function(b){b.status>0&&(a.errorMsg=b.status+": "+b.data)},function(a){b.progress=Math.min(100,parseInt(100*a.loaded/a.total))})},a.catches=b.query(),a.addCatch=function(c){a.newCatch=b.save(c,function(){a.catches.push(a.newCatch)})}}]),angular.module("upstreamApp").factory("catchService",["$resource",function(a){var b=a("http://162.243.237.149/api/catches/:catch",{"catch":"@catch"},{update:{method:"PUT"}});return b}]),angular.module("upstreamApp").controller("UploadCtrl",["$scope","catchService","$resource","Upload","$routeParams","$timeout","$location",function(a,b,c,d,e,f,g){a.uploadPic=function(b){b.upload=d.upload({url:"http://162.243.237.149/api/catches",data:{fishPhoto:b,title:a.title}}),b.upload.then(function(a){f(function(){b.result=a.data,console.log(a.data)})},function(b){b.status>0&&(a.errorMsg=b.status+": "+b.data)},function(a){b.progress=Math.min(100,parseInt(100*a.loaded/a.total))})}}]),angular.module("upstreamApp").controller("UserCtrl",["$scope","userService","$resource","$routeParams",function(a,b,c,d){var e=b.get({id:d.userId},function(){a.user=e})}]),angular.module("upstreamApp").factory("userService",["$resource",function(a){var b=a("http://162.243.237.149/api/users/:id",{id:"@id"},{update:{method:"PUT"}});return b}]),angular.module("upstreamApp").controller("SearchCtrl",["$scope",function(a){}]),angular.module("upstreamApp").controller("RegistrationCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("upstreamApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container text-center"> <p>Upstream is CHANGING THE WORLD. </p> </div>'),a.put("views/catch.html",'<div class="stream"> <div class="stream-item" ng-repeat="catch in catches | orderBy: \'-created_at\'"> <img ng-src="{{catch.fishPhoto}}" class="img-responsive"> <div class="by-line"> <h5 class="md-title md-body-3"><a ng-href="#/user/{{catch.owner.id}}">{{catch.owner.username}}</a></h5> <h5 class="md-title md-body-2">{{catch.created_at | date:short}}</h5> </div> <h4 class="md-display-1">{{catch.title}}</h4> <md-card-actions layout="row" layout-align="end"> <md-button class="md-icon-button" aria-label="Favorite"> <span class="material-icons">favorite_border</span> </md-button> </md-card-actions> </div> </div>'),a.put("views/login.html",'<div class="container"> <form ng-submit="loginUser()"> <h1 class="md-display-3 text-center">Upstream.</h1> <h1 class="md-display-1 text-center">It\'s fish all the way down.</h1> <div layout="column"> <!-- Username and password input--> <md-input-container flex> <label>Username</label> <input autocapitalize="off" ng-model="username"> </md-input-container> <md-input-container flex> <label>Password</label> <input type="password" autocapitalize="off" ng-model="password"> </md-input-container> <!-- Button --> <md-button class="md-raised md-primary" layout-align="center">Login</md-button> </div> <h4 class="md-body-3 text-center">New to Upstream? <a ng-href="#/registration">Create an account.</a></h4> </form> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/registration.html",'<div class="container"> <form ng-submit="createUser()"> <h1 class="md-display-3 text-center">A new angler is born.</h1> <div layout="column"> <!-- Username and password creation--> <md-input-container flex> <label>Username</label> <input autocapitalize="off" ng-model="username"> </md-input-container> <md-input-container flex> <label>Password</label> <input required type="password" autocapitalize="off" ng-model="password1"> </md-input-container> <md-input-container flex> <label>Confirm password</label> <input required type="password" autocapitalize="off" ng-model="password2"> </md-input-container> <!-- Button --> <md-button class="md-raised md-primary" layout-align="center">Create profile</md-button> </div> </form> </div>'),a.put("views/search.html",'<div class="text-center"> <h1 md-display-2>Future search page!</h1> </div>'),a.put("views/upload.html",'<div class="container"> <h1 class="md-display-2 text-center" ng-hide="picFile">Let\'s see those fish.</h1> <h3 class="md-display-3 text-center" ng-show="picFile.result">Upload Successful!</h3> <form name="myForm"> <div class="form-group"> <div layout="column"> <md-button input class="md-raised md-primary" type="file" ngf-select ng-model="picFile" ng-hide="picFile" name="file" accept="image/*" ngf-max-size="2MB" required>Choose photo</md-button> <h6 class="md-caption text-center" ng-hide="picFile">Maximum file size of 2MB</h6> </div> <i ng-show="myForm.file.$error.maxSize">File too large {{picFile.size / 1000000|number:1}}MB: max 2M</i> <img ng-show="myForm.file.$valid" ngf-thumbnail="picFile" class="img-responsive"> <h3 class="md-display-1" ng-show="picFile">Describe this photo</h3> <md-input-container flex ng-show="picFile" md-no-float> <input ng-model="title"> </md-input-container> <div layout="row" flex> <md-button class="md-raised md-warn" ng-click="picFile = null" ng-show="picFile" flex>Remove</md-button> <md-button class="md-raised md-primary" ng-disabled="!myForm.$valid" ng-click="uploadPic(picFile)" ng-show="picFile" flex>Submit</md-button> </div> <span class="progress" ng-show="picFile.progress >= 0"> <div style="width:{{picFile.progress}}%" ng-bind="picFile.progress + \'%\'"></div> </span> <span class="err" ng-show="errorMsg">{{errorMsg}}</span> </div> </form></div>'),a.put("views/user.html",'<div class="container text-center"> <h1 class="md-display-3 text-center">Photos by {{user.username}}</h1> </div> <div class="user-grid" layout-wrap layout="row"> <div flex="33" layout layout-align="center center" ng-repeat="catch in user.catches | orderBy: \'-created_at\'"> <a ng-href="#/user/{{catch.owner}}/{{catch.id}}"><img ng-src="{{catch.fishPhoto}}" class="img-responsive"></a> </div> </div> <!-- \r\n<div class="stream">\r\n	<div class="stream-item" ng-repeat="catch in user.catches | orderBy: \'-created_at\'">\r\n		\r\n		<img ng-src="{{catch.fishPhoto}}" class="img-responsive">\r\n		<div class="by-line">\r\n			<h5>posted by {{catch.owner}}</h5>\r\n			<h5>{{catch.created_at | date:short}}</h5>\r\n		</div>\r\n		<h4>{{catch.title}}</h4>\r\n		<md-card-actions layout="row" layout-align="end">\r\n			<md-button><span class="material-icons">favorite_border</span></md-button>\r\n		</md-card-actions>\r\n	</div>\r\n</div> -->')}]);