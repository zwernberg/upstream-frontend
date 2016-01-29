"use strict";angular.module("upstreamApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngFileUpload","ngMaterial","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider","$httpProvider","$mdThemingProvider",function(a,b,c){a.when("/",{templateUrl:"views/catch.html",controller:"CatchCtrl",controllerAs:"catch",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/catch",{templateUrl:"views/catch.html",controller:"CatchCtrl",controllerAs:"catch"}).when("/upload",{templateUrl:"views/upload.html",controller:"UploadCtrl"}).when("/user",{templateUrl:"views/user.html",controller:"UserCtrl"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl"}).when("/registration",{templateUrl:"views/registration.html",controller:"RegistrationCtrl"}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl",controllerAs:"logout"}).otherwise({redirectTo:"/"}),c.theme("default").primaryPalette("blue").accentPalette("orange")}]),angular.module("upstreamApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("upstreamApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("upstreamApp").factory("AuthInterceptor",["$injector","$location","$q","$window",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},d.sessionStorage.token&&(a.headers.Authorization=d.sessionStorage.token),a},responseError:function(a){return(401===a.status||"/login"!==a.config.url)&&b.path("/login"),c.reject(a)}}}]),angular.module("upstreamApp").controller("LoginCtrl",["$scope","$location","djangoAuth","Validate",function(a,b,c,d){a.username="",a.password="",a.complete=!1,a.login=function(e){a.errors=[],d.form_validation(e,a.errors),e.$invalid||c.login(a.username,a.password).then(function(a){b.path("/")},function(b){a.errors=b})}}]),angular.module("upstreamApp").factory("loginService",["$resource",function(a){var b=a("http://162.243.237.149/api-token-auth/");return b}]),angular.module("upstreamApp").controller("CatchCtrl",["$scope","catchService","userService","currentUserService","$resource","Upload","$routeParams","$timeout",function(a,b,c,d,e,f,g,h){a.catches=b.query(),d.get(function(b){a.currentUser=b}),a.likePhoto=function(a){a.likes++,a.$like({"catch":a.id})}}]),angular.module("upstreamApp").factory("catchService",["$resource",function(a){return a("http://162.243.237.149/api/catches/:catch",{"catch":"@catch"},{update:{method:"PUT"},like:{method:"POST",url:"http://162.243.237.149/api/catches/:catch/like"}})}]),angular.module("upstreamApp").controller("UploadCtrl",["$scope","catchService","$resource","Upload","$routeParams","$timeout","$location",function(a,b,c,d,e,f,g){a.uploadPic=function(b){b.upload=d.upload({url:"http://162.243.237.149/api/catches",data:{fishPhoto:b,title:a.title}}),b.upload.then(function(a){f(function(){b.result=a.data,console.log(a.data)})},function(b){b.status>0&&(a.errorMsg=b.status+": "+b.data)},function(a){b.progress=Math.min(100,parseInt(100*a.loaded/a.total))})}}]),angular.module("upstreamApp").controller("UserCtrl",["$scope","djangoAuth","Validate",function(a,b,c){a.model={first_name:"",last_name:"",email:""},a.complete=!1,b.profile().then(function(b){a.model=b}),a.updateProfile=function(d,e){a.errors=[],c.form_validation(d,a.errors),d.$invalid||b.updateProfile(e).then(function(b){a.complete=!0},function(b){a.error=b})}}]),angular.module("upstreamApp").factory("userService",["$resource",function(a){var b=a("http://162.243.237.149/api/users/:id",{id:"@id"},{update:{method:"PUT"}});return b}]),angular.module("upstreamApp").controller("SearchCtrl",["$scope",function(a){}]),angular.module("upstreamApp").controller("RegistrationCtrl",["$scope","loginService","$http","$window","$location","registerService",function(a,b,c,d,e,f){a.registerUser=function(){a.password1.length>5&&a.password1==a.password2&&(a.register=f.save({username:a.username,password1:a.password1,password2:a.password2},function(a){},function(a){e.path("/")},function(a){404===a.status}))}}]),angular.module("upstreamApp").factory("registerService",["$resource",function(a){var b=a("http://162.243.237.149/rest-auth/registration");return b}]),angular.module("upstreamApp").service("currentUserService",["$resource",function(a){return a("http://162.243.237.149/api/currentuser")}]),angular.module("upstreamApp").service("djangoAuth",["$q","$http","$cookies","$rootScope","$location","$window",function(a,b,c,d,e,f){var g={API_URL:"//162.243.237.149/rest-auth",use_session:!1,authenticated:null,authPromise:null,request:function(e){f.sessionStorage.token&&(b.defaults.headers.common.Authorization="Token "+f.sessionStorage.token,d.authenticated=!0),j=e.params||{},e=e||{};var g=a.defer(),h=this.API_URL+e.url,i=e.method||"GET",j=j,k=e.data||{};return b({url:h,withCredentials:this.use_session,method:i.toUpperCase(),headers:{"X-CSRFToken":c.csrftoken},params:j,data:k}).success(angular.bind(this,function(a,b,c,d){g.resolve(a,b)})).error(angular.bind(this,function(a,b,c,d){console.log("error syncing with: "+h),a&&(a.status=b),0==b&&(""==a&&(a={},a.status=0,a.non_field_errors=["Could not connect. Please try again."]),null==a&&(a={},a.status=0,a.non_field_errors=["Server timed out. Please try again."])),g.reject(a,b,c,d)})),g.promise},register:function(a,b,c,d,e){var f={username:a,password1:b,password2:c,email:d};return f=angular.extend(f,e),this.request({method:"POST",url:"/registration/",data:f})},login:function(a,c){var e=this;return this.request({method:"POST",url:"/login/",data:{username:a,password:c}}).then(function(a){e.use_session||(b.defaults.headers.common.Authorization="Token "+a.key,f.sessionStorage.token=a.key),d.authenticated=!0,d.$broadcast("djangoAuth.logged_in",a)})},logout:function(){return this.request({method:"POST",url:"/logout/"}).then(function(a){delete b.defaults.headers.common.Authorization,delete f.sessionStorage.token,d.authenticated=!1,d.$broadcast("djangoAuth.logged_out")})},changePassword:function(a,b){return this.request({method:"POST",url:"/password/change/",data:{new_password1:a,new_password2:b}})},resetPassword:function(a){return this.request({method:"POST",url:"/password/reset/",data:{email:a}})},profile:function(){return this.request({method:"GET",url:"/user/"})},updateProfile:function(a){return this.request({method:"PATCH",url:"/user/",data:a})},verify:function(a){return this.request({method:"POST",url:"/registration/verify-email/",data:{key:a}})},confirmReset:function(a,b,c,d){return this.request({method:"POST",url:"/password/reset/confirm/",data:{uid:a,token:b,new_password1:c,new_password2:d}})},authenticationStatus:function(b,c){b=b||!1,c=c||!1,(null==this.authPromise||c)&&(this.authPromise=this.request({method:"GET",url:"/user/"}));var f=a.defer();return null==d.authenticated||c?this.authPromise.then(function(){d.authenticated=!0,f.resolve()},function(){d.authenticated=!1,b?(e.path("/login"),f.reject("User is not logged in.")):f.resolve()}):0==d.authenticated&&b?(e.path("/login"),f.reject("User is not logged in.")):f.resolve(),f.promise},initialize:function(a,b){return this.API_URL=a,this.use_session=b,this.authenticationStatus()}};return g}]),angular.module("upstreamApp").service("Validate",function(){return{message:{minlength:"This value is not long enough.",maxlength:"This value is too long.",email:"A properly formatted email address is required.",required:"This field is required."},more_messages:{demo:{required:"Here is a sample alternative required message."}},check_more_messages:function(a,b){return(this.more_messages[a]||[])[b]||null},validation_messages:function(a,b,c){var d=[];for(var e in b[a].$error)if(b[a].$error[e]){var f=this.check_more_messages(a,e);f?d.push(f):this.message[e]?d.push(this.message[e]):d.push("Error: "+e)}var g=[];angular.forEach(d,function(a,b){-1===g.indexOf(a)&&g.push(a)}),c&&(c[a]=g)},form_validation:function(a,b){for(var c in a)"$"!=c.substr(0,1)&&this.validation_messages(c,a,b)}}}),angular.module("upstreamApp").controller("LogoutCtrl",["$scope","$location","djangoAuth",function(a,b,c){c.logout()}]),angular.module("upstreamApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container text-center"> <p>Upstream is CHANGING THE WORLD. </p> </div>'),a.put("views/catch.html",'<div class="stream"> <div class="stream-item" ng-repeat="catch in catches | orderBy: \'-created_at\'"> <img ng-src="{{catch.fishPhoto}}" class="img-responsive"> <div class="stream-item-body"> <div class="by-line"> <h5 class="md-body-1"><a ng-href="#/user/{{catch.owner.id}}">{{catch.owner.username}}</a></h5> <h5 class="md-body-1"><a ng-href="#/user/{{catch.owner.id}}">{{catch.created_at | date:short}}</a></h5> </div> <div layout> <h4 class="md-subhead" flex>{{catch.title}}</h4> <h4 class="md-subhead">{{catch.likes}} likes</h4> </div> <div layout> <md-input-container flex="80"> <label>Comment</label> <input ng-model="user.comment"> </md-input-container> <div layout="column" layout-align="center end" flex> <div class="material-icons" aria-label="Favorite" ng-click="likePhoto(catch)">favorite_border</div> </div> </div> </div> </div> </div>'),a.put("views/login.html",'<div class="container"> <form role="form" ng-submit="login(loginForm)" name="loginForm" novalidate> <h1 class="md-display-3 text-center">Upstream.</h1> <h1 class="md-display-1 text-center">It\'s fish all the way down.</h1> <div layout="column"> <md-input-container flex> <label>Username</label> <input autocapitalize="off" ng-model="username" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.username">{{error}}</div> <md-input-container flex> <label>Password</label> <input type="password" autocapitalize="off" ng-model="password" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.password">{{error}}</div> <div class="alert alert-danger" ng-repeat="error in errors.non_field_errors">{{error}}</div> <div class="alert alert-danger" ng-if="error">{{error}}</div> <md-button type="submit" class="md-raised md-primary">Login</md-button> </div> </form> <h4 class="md-body-3 text-center">New to Upstream? <a ng-href="#/registration">Create an account.</a></h4> </div>'),a.put("views/logout.html",'<div id="logout_view"> <div class="alert alert-info">You have logged out.</div> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/registration.html",'<div class="container"> <form ng-submit="registerUser()" autocapitalize="off"> <h1 class="md-display-3 text-center">A new angler is born.</h1> <div layout="column"> <!-- Username and password creation--> <md-input-container flex> <label>Username</label> <input required ng-model="username"> </md-input-container> <md-input-container flex> <label>Password (at least 6 characters)</label> <input minlength="6" required type="password" ng-model="password1"> </md-input-container> <md-input-container flex> <label>Confirm password</label> <input minlength="6" required type="password" ng-model="password2"> </md-input-container> <!-- Button --> <md-button class="md-raised md-primary" layout-align="center">Create profile</md-button> </div> </form> </div>'),a.put("views/search.html",'<div class="text-center"> <h1 md-display-2>Future search page!</h1> </div>'),a.put("views/upload.html",'<div class="container"> <h1 class="md-display-2 text-center" ng-hide="picFile">Let\'s see those fish.</h1> <h3 class="md-display-3 text-center" ng-show="picFile.result">Upload Successful!</h3> <form name="myForm"> <div class="form-group"> <div layout="column"> <md-button input class="md-raised md-primary" type="file" ngf-select ng-model="picFile" ng-hide="picFile" name="file" accept="image/*" ngf-max-size="2MB" required>Choose photo</md-button> <h6 class="md-caption text-center" ng-hide="picFile">Maximum file size of 2MB</h6> </div> <i ng-show="myForm.file.$error.maxSize">File too large {{picFile.size / 1000000|number:1}}MB: max 2M</i> <img ng-show="myForm.file.$valid" ngf-thumbnail="picFile" class="img-responsive"> <h3 class="md-display-1" ng-show="picFile">Describe this photo</h3> <md-input-container flex ng-show="picFile" md-no-float> <input ng-model="title"> </md-input-container> <div layout="row" flex> <md-button class="md-raised md-warn" ng-click="picFile = null" ng-show="picFile" flex>Remove</md-button> <md-button class="md-raised md-primary" ng-disabled="!myForm.$valid" ng-click="uploadPic(picFile)" ng-show="picFile" flex>Submit</md-button> </div> <span class="progress" ng-show="picFile.progress >= 0"> <div style="width:{{picFile.progress}}%" ng-bind="picFile.progress + \'%\'"></div> </span> <span class="err" ng-show="errorMsg">{{errorMsg}}</span> </div> </form></div>'),a.put("views/user.html",'<div id="userProfile_view"> <div ng-if="complete == false"> <form role="form" ng-if="authenticated" name="userProfileForm" ng-submit="updateProfile(userProfileForm, model)" novalidate> <div class="form-group"> <label for="id_first_name">First Name</label> <input name="first_name" id="id_first_name" class="form-control" type="text" ng-model="model.first_name" placeholder="First Name"> </div> <div class="alert alert-danger" ng-repeat="error in errors.first_name">{{error}}</div> <div class="form-group"> <label for="id_last_name">Last Name</label> <input name="last_name" id="id_last_name" class="form-control" type="text" ng-model="model.last_name" placeholder="Last Name"> </div> <div class="alert alert-danger" ng-repeat="error in errors.last_name">{{error}}</div> <div class="form-group"> <label for="id_email">Email</label> <input name="email" id="id_email" class="form-control" type="email" ng-model="model.email" placeholder="Email" required> </div> <div class="alert alert-danger" ng-repeat="error in errors.email">{{error}}</div> <button type="submit" ng-show="authenticated" class="btn btn-primary">Update Profile</button> </form> <div class="alert alert-warning" ng-if="authenticated == false">You need to be logged in to do this.</div> </div> <div ng-if="complete == true"> <div class="alert alert-success">You have updated your profile.</div> </div> </div>')}]);