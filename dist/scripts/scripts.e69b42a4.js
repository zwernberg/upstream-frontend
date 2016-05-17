"use strict";angular.module("upstreamApp",["angularMoment","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngFileUpload","ngMaterial","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider","$httpProvider","$mdThemingProvider",function(a,b,c){a.when("/",{templateUrl:"views/stream.html",controller:"StreamCtrl",controllerAs:"stream",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/catch/:catchId",{templateUrl:"views/catch.html",controller:"CatchCtrl",controllerAs:"vm",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).when("/upload",{templateUrl:"views/upload.html",controller:"UploadCtrl",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).when("/user/:userId",{templateUrl:"views/user.html",controller:"UserCtrl",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl"}).when("/registration",{templateUrl:"views/registration.html",controller:"RegistrationCtrl"}).when("/userprofile",{templateUrl:"views/userprofile.html",controller:"UserprofileCtrl",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).when("/stream",{templateUrl:"views/stream.html",controller:"StreamCtrl",controllerAs:"stream",resolve:{authenticated:["djangoAuth",function(a){return a.authenticationStatus(!0)}]}}).otherwise({redirectTo:"/"}),c.theme("default").primaryPalette("grey",{"default":"900"}).accentPalette("light-green",{"default":"800"})}]).run(["djangoAuth",function(a){a.initialize("//angler.online/api/rest-auth",!1)}]),angular.module("upstreamApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("upstreamApp").factory("AuthInterceptor",["$injector","$location","$q","$window",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},d.sessionStorage.token&&(a.headers.Authorization=d.sessionStorage.token),a},responseError:function(a){return(401===a.status||"/login"!==a.config.url)&&b.path("/login"),c.reject(a)}}}]),angular.module("upstreamApp").controller("LoginCtrl",["$scope","$location","djangoAuth","Validate",function(a,b,c,d){a.username="",a.password="",a.complete=!1,a.login=function(e){a.errors=[],d.form_validation(e,a.errors),e.$invalid||c.login(a.username,a.password).then(function(a){b.path("/")},function(b){a.errors=b})}}]),angular.module("upstreamApp").factory("loginService",["$resource",function(a){var b=a("http://162.243.237.149/api-token-auth/");return b}]),angular.module("upstreamApp").controller("CatchCtrl",["$scope","catchService","userService","currentUserService","$resource","Upload","$routeParams","$rootScope","$timeout",function(a,b,c,d,e,f,g,h,i){var j=this;j["catch"]=b.get({catchId:g.catchId}),j.postComment=function(a){j.newComment={owner:{id:h.currentUser.id,username:h.currentUser.username},text:a},b.comment({catchId:j["catch"].id},{text:j.newComment.text},function(){j["catch"].comments.push(j.newComment),j.newComment=""})},a.likePhoto=function(a){a.liked?(a.$unlike({catchId:a.id}),a.likes-=1,a.liked=!1):(a.$like({catchId:a.id}),a.likes+=1,a.liked=!0)}}]),angular.module("upstreamApp").factory("catchService",["$resource","$http",function(a,b){return a("http://angler.online/api/catches/:catchId",{catchId:"@catchId"},{query:{isArray:!0,method:"GET",params:{},transformResponse:function(a){return angular.fromJson(a).results}},update:{method:"PUT"},like:{method:"POST",url:"http://angler.online/api/catches/:catchId/like"},unlike:{method:"POST",url:"http://angler.online/api/catches/:catchId/unlike"},comment:{method:"POST",url:"http://angler.online/api/catches/:catchId/comments"}})}]),angular.module("upstreamApp").controller("UploadCtrl",["$scope","catchService","$resource","Upload","$routeParams","$timeout","$location",function(a,b,c,d,e,f,g){a.photoSelected=!1,a.photoDetailsCompleted=!1,a.grayscale=50,a.selectPhoto=function(){a.photoSelected=!0},a.completePhotoDetails=function(){a.photoSelected=!1,a.photoDetailsCompleted=!0},a.unCompletePhotoDetails=function(){a.photoSelected=!0,a.photoDetailsCompleted=!1},a.uploadPic=function(b){b.upload=d.upload({url:"http://162.243.237.149/api/catches",data:{fishPhoto:b,title:a.title,location:a.location,length:a.length}}),b.upload.then(function(a){f(function(){b.result=a.data,g.path("/")})},function(b){b.status>0&&(a.errorMsg=b.status+": "+b.data)},function(a){b.progress=Math.min(100,parseInt(100*a.loaded/a.total))})},a.tags=[]}]),angular.module("upstreamApp").controller("UserCtrl",["$scope","userService","currentUserService","$resource","$routeParams","$mdToast","$location","djangoAuth",function(a,b,c,d,e,f,g,h){var i=b.get({id:e.userId},function(){a.user=i});a.follow=function(a){0==i.is_following?(b.follow({id:a.id}),i.is_following=!0,i.followers++,f.show(f.simple().content("You now follow "+i.username).position("right bottom"))):(b.unfollow({id:a.id}),i.is_following=!1,i.followers--,f.show(f.simple().content("You no longer follow "+i.username).position("right bottom")))},a.confirmLogout=function(){var a=f.simple().content("Are you sure you want to log out?").action("OK").highlightAction(!1).position("center top");f.show(a).then(function(a){"ok"==a&&h.logout().then(function(){g.path("/login")})})}}]),angular.module("upstreamApp").factory("userService",["$resource",function(a){var b=a("http://angler.online/api/users/:id",{id:"@id"},{update:{method:"PUT"},follow:{method:"POST",url:"http://angler.online/api/users/:id/follow"},unfollow:{method:"POST",url:"http://angler.online/api/users/:id/unfollow"}});return b}]),angular.module("upstreamApp").controller("SearchCtrl",["$scope",function(a){a.results=[{userId:3,avatar:"images/avatar.png",name:"ben"},{userId:2,avatar:"images/avatar.png",name:"werny"},{userId:3,avatar:"images/avatar.png",name:"sarah"},{userId:3,avatar:"images/avatar.png",name:"mandy"},{userId:3,avatar:"images/avatar.png",name:"matt"},{userId:3,avatar:"images/avatar.png",name:"luke"},{userId:3,avatar:"images/avatar.png",name:"sam"},{userId:3,avatar:"images/avatar.png",name:"samantha"},{userId:3,avatar:"images/avatar.png",name:"samurai"},{userId:3,avatar:"images/avatar.png",name:"huge_fisher"},{userId:3,avatar:"images/avatar.png",name:"salmonhunter"}]}]),angular.module("upstreamApp").controller("RegistrationCtrl",["$scope","djangoAuth","Validate",function(a,b,c){a.model={username:"",password:"",email:""},a.complete=!1,a.register=function(d){a.errors=[],c.form_validation(d,a.errors),d.$invalid||b.register(a.model.username,a.model.password1,a.model.password2,a.model.email).then(function(b){a.complete=!0},function(b){a.errors=b})}}]),angular.module("upstreamApp").factory("registerService",["$resource",function(a){var b=a("http://162.243.237.149/rest-auth/registration");return b}]),angular.module("upstreamApp").service("currentUserService",["$resource",function(a){return a("http://162.243.237.149/api/currentuser")}]),angular.module("upstreamApp").service("djangoAuth",["$q","$http","$cookies","$rootScope","$location",function(a,b,c,d,e){var f={API_URL:"//angler.online/api/rest-auth",use_session:!1,authenticated:null,authPromise:null,request:function(e){c.get("token")&&(b.defaults.headers.common.Authorization="Token "+JSON.parse(c.get("token")),d.authenticated=!0),c.get("currentUser")&&(d.currentUser=JSON.parse(c.get("currentUser"))),i=e.params||{},e=e||{};var f=a.defer(),g=this.API_URL+e.url,h=e.method||"GET",i=i,j=e.data||{};return b({url:g,withCredentials:this.use_session,method:h.toUpperCase(),headers:{"X-CSRFToken":c.csrftoken},params:i,data:j}).success(angular.bind(this,function(a,b,c,d){f.resolve(a,b)})).error(angular.bind(this,function(a,b,c,d){console.log("error syncing with: "+g),a&&(a.status=b),0==b&&(""==a&&(a={},a.status=0,a.non_field_errors=["Could not connect. Please try again."]),null==a&&(a={},a.status=0,a.non_field_errors=["Server timed out. Please try again."])),f.reject(a,b,c,d)})),f.promise},register:function(a,b,c,d,e){var f={username:a,password1:b,password2:c,email:d};return f=angular.extend(f,e),this.request({method:"POST",url:"/registration/",data:f})},login:function(a,e){var f=this;return delete b.defaults.headers.common.Authorization,c.remove("currentUser"),c.remove("token"),this.request({method:"POST",url:"/login/",data:{username:a,password:e}}).then(function(a){if(!f.use_session){b.defaults.headers.common.Authorization="Token "+a.key;JSON.stringify(a.key);c.putObject("token",a.key)}f.profile().then(function(a){d.currentUser=a,c.put("currentUser",angular.toJson(a)),console.log(d.currentUser)}),d.authenticated=!0,d.$broadcast("djangoAuth.logged_in",a)})},logout:function(){return delete b.defaults.headers.common.Authorization,c.remove("currentUser"),c.remove("token"),this.request({method:"POST",url:"/logout/"}).then(function(a){delete b.defaults.headers.common.Authorization,c.remove("currentUser"),c.remove("token"),d.currentUser="",d.authenticated=!1,d.$broadcast("djangoAuth.logged_out")})},changePassword:function(a,b){return this.request({method:"POST",url:"/password/change/",data:{new_password1:a,new_password2:b}})},resetPassword:function(a){return this.request({method:"POST",url:"/password/reset/",data:{email:a}})},profile:function(){return this.request({method:"GET",url:"/user/"})},updateProfile:function(a){return this.request({method:"PATCH",url:"/user/",data:a})},verify:function(a){return this.request({method:"POST",url:"/registration/verify-email/",data:{key:a}})},confirmReset:function(a,b,c,d){return this.request({method:"POST",url:"/password/reset/confirm/",data:{uid:a,token:b,new_password1:c,new_password2:d}})},authenticationStatus:function(b,c){b=b||!1,c=c||!1,(null==this.authPromise||c)&&(this.authPromise=this.request({method:"GET",url:"/user/"}));var f=a.defer();return null==d.authenticated||c?this.authPromise.then(function(){d.authenticated=!0,f.resolve()},function(){d.authenticated=!1,b?(e.path("/login"),f.reject("User is not logged in.")):f.resolve()}):0==d.authenticated&&b?(e.path("/login"),f.reject("User is not logged in.")):f.resolve(),f.promise},initialize:function(a,b){return this.API_URL=a,this.use_session=b,this.authenticationStatus()}};return f}]),angular.module("upstreamApp").service("Validate",function(){return{message:{minlength:"This value is not long enough.",maxlength:"This value is too long.",email:"A properly formatted email address is required.",required:"This field is required."},more_messages:{demo:{required:"Here is a sample alternative required message."}},check_more_messages:function(a,b){return(this.more_messages[a]||[])[b]||null},validation_messages:function(a,b,c){var d=[];for(var e in b[a].$error)if(b[a].$error[e]){var f=this.check_more_messages(a,e);f?d.push(f):this.message[e]?d.push(this.message[e]):d.push("Error: "+e)}var g=[];angular.forEach(d,function(a,b){-1===g.indexOf(a)&&g.push(a)}),c&&(c[a]=g)},form_validation:function(a,b){for(var c in a)"$"!=c.substr(0,1)&&this.validation_messages(c,a,b)}}}),angular.module("upstreamApp").controller("UserprofileCtrl",["$scope","djangoAuth","Validate","$location","$rootScope",function(a,b,c,d,e){a.model={first_name:"",last_name:"",email:"",bio:""},a.complete=!1,b.profile().then(function(b){a.model=b}),a.updateProfile=function(f,g){a.errors=[],c.form_validation(f,a.errors),f.$invalid||b.updateProfile(g).then(function(a){d.path("/user/"+e.currentUser.id)},function(b){a.error=b})}}]),angular.module("upstreamApp").controller("StreamCtrl",["$scope","$rootScope","catchService","postService","userService","currentUserService","$resource","Upload","$routeParams","$timeout",function(a,b,c,d,e,f,g,h,i,j){a.isOpen=!1,a.catches=c.query(),a.toggleComments=function(a){d.toggleComment(a)},a.postComment=function(a,d){var e={owner:{id:b.currentUser.id,username:b.currentUser.username},text:d};c.comment({catchId:a.id},{text:e.text},function(){a.comments.push(e),a.newComment.text=""})},a.likePhoto=function(a){a.liked?(a.$unlike({catchId:a.id}),a.likes-=1,a.liked=!1):(a.$like({catchId:a.id}),a.likes+=1,a.liked=!0)},a.loadMoreCatches=function(){console.log("loading additional catches")}}]),angular.module("upstreamApp").factory("postService",function(){return{toggleComment:function(a){a.commentLimit=null==a.commentLimit?3:null}}}),angular.module("upstreamApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container text-center"> <p>Upstream is CHANGING THE WORLD. </p> </div>'),a.put("views/catch.html",'<header> <md-toolbar> <div class="md-toolbar-tools" layout-align="center end"> <a ng-href="#/stream" class="material-icons">arrow_back</a> <div flex></div> <a ng-href="#/search" class="material-icons" layout-margin>search</a> <a ng-href="#/user/{{currentUser.id}}" class="material-icons" layout-margin>person</a> </div> </md-toolbar> </header> <div class="stream"> <div class="stream-item"> <div class="stream-item__body"> <div layout layout-align="center center"> <img src="images/avatar.png" alt="avatar"> <p class="md-body-1" flex><a ng-href="#/user/{{vm.catch.owner.id}}">{{vm.catch.owner.username}}</a></p> <p class="md-subhead" ng-style="{ \'color\' : (vm.catch.liked) ? \'#bd320f\' : \'#c2c2d6\' }">{{vm.catch.likes}}</p> <div class="material-icons" aria-label="Favorite" ng-style="{\'color\' : (vm.catch.liked) ? \'#bd320f\' : \'#c2c2d6\' }" ng-click="likePhoto(vm.catch)">favorite</div> </div> </div> <a ng-href="#/catch/{{vm.catch.id}}"><img ng-src="{{vm.catch.fishPhoto}}" class="img-responsive fish-photo"></a> <div class="stream-item__body"> <div layout> <div layout="column" flex> <p class="md-body-1"><a ng-href="#/user/{{vm.catch.owner.id}}">{{vm.catch.location}}</a></p> <p class="md-subhead">{{vm.catch.title}}</p> </div> <div layout="column"> <p class="md-caption"><a ng-href="#/catch/{{vm.catch.id}}" am-time-ago="vm.catch.created_at"></a></p> <p class="md-body-1" ng-show="vm.catch.length>0">{{vm.catch.length}} inches </p> </div> </div> <div class="comments"> <p class="md-caption" ng-repeat="comment in vm.catch.comments"><a ng-href="#/user/{{comment.owner.id}}">{{comment.owner.username}}</a> {{ comment.text }}</p> </div> <div layout layout-align="space-between end"> <md-input-container flex="60"> <label>Comment</label> <input ng-model="vm.newComment.text"> </md-input-container> <md-button class="md-raised md-primary" ng-show="vm.newComment.text.length > 0" ng-click="vm.postComment(vm.newComment.text)">Submit</md-button> </div> </div> </div> </div>'),a.put("views/login.html",'<div class="splash-page"> <header> <div class="md-toolbar-tools" layout-align="center end"> <h1 flex>Angler</h1> <a ng-href="#/registration">Create an account</a> </div> </header> <div class="container login-form"> <form role="form" ng-submit="login(loginForm)" name="loginForm" novalidate> <div layout="column"> <md-input-container flex> <label>Username</label> <input autocapitalize="off" ng-model="username" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.username">{{error}}</div> <md-input-container flex> <label>Password</label> <input type="password" autocapitalize="off" ng-model="password" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.password">{{error}}</div> <div class="alert alert-danger" ng-repeat="error in errors.non_field_errors">{{error}}</div> <div class="alert alert-danger" ng-if="error">{{error}}</div> <button type="submit">Login</button> </div> </form> <p class="md-body-4 text-center">Forgot your username or password? Click <a ng-href="#">here.</a></p> </div> <footer> <div class="container text-center"> <p class="md-caption">lovingly made by <a href="http://www.bzlab.org">bzlab</a> - brother to brother brogramming</p> <p class="md-caption">&copy; 2016</p> </div> </footer> </div>'),a.put("views/registration.html",'<div id="register_view" class="container register-form"> <p class="md-display-3 text-center">A new angler is born.</p> <div ng-if="complete == false"> <form role="form" ng-if="authenticated != true" name="registerForm" ng-submit="register(registerForm)" layout="column" novalidate> <md-input-container flex> <label for="id_username">Username</label> <input name="username" id="id_username" class="form-control" type="text" ng-model="model.username" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.username">{{error}}</div> <md-input-container flex> <label for="id_password">Password</label> <input name="password1" id="id_password1" class="form-control" type="password" ng-model="model.password1" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.password1">{{error}}</div> <md-input-container flex> <label for="id_password">Repeat Password</label> <input name="password" id="id_password2" class="form-control" type="password" ng-model="model.password2" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.password2">{{error}}</div> <md-input-container flex> <label for="id_email">Email</label> <input name="email" id="id_email" class="form-control" type="email" ng-model="model.email" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.email">{{error}}</div> <md-button type="submit" class="md-raised md-accent" flex>Register</md-button> </form> <p ng-if="authenticated">You are already logged in! You don\'t need to register.</p> </div> <div ng-if="complete == true"> <div class="alert alert-success">Great! You\'ve just registered. You may click <a ng-href="#/login">here</a> to login</div> </div> </div> <footer class="register-form"> <div class="container text-center"> <p class="md-caption">lovingly made by <a href="http://www.bzlab.org">bzlab</a> - brother to brother brogramming</p> <p class="md-caption">&copy; 2016</p> </div> </footer>'),a.put("views/search.html",'<header> <md-toolbar> <div class="md-toolbar-tools" layout-align="center end"> <a ng-href="#/stream"><h1> angler</h1></a> <div flex></div> <a ng-href="#/search" class="material-icons" layout-margin>search</a> <a ng-href="#/user/{{currentUser.id}}" class="material-icons" layout-margin>person</a> </div> </md-toolbar> </header> <div class="container"> <p class="md-display-2 text-center">Find other anglers</p> <md-input-container> <label>Search...</label> <input ng-model="search" autofocus> </md-input-container> <div class="search-result" ng-repeat="result in results | filter:search"> <a ng-href="#/user/{{ result.userId }}"> <div layout layout-align="center center"> <img ng-src="{{ result.avatar }}" alt="avatar"> <p class="md-body-1" flex>{{result.name}}</p> </div> </a> </div> </div>'),a.put("views/stream.html",'<header> <md-toolbar> <div class="md-toolbar-tools" layout-align="center end"> <a ng-href="#/stream"><h1> angler</h1></a> <div flex></div> <a ng-href="#/search" class="material-icons" layout-margin>search</a> <a ng-href="#/user/{{currentUser.id}}" class="material-icons" layout-margin>person</a> </div> </md-toolbar> </header> <div class="stream"> <div class="stream-item" ng-repeat="catch in catches | orderBy: \'-created_at\'"> <div class="stream-item__body"> <div layout layout-align="center center"> <img src="images/avatar.png" alt="avatar"> <p class="md-body-1" flex><a ng-href="#/user/{{catch.owner.id}}">{{catch.owner.username}}</a></p> <p class="md-subhead" ng-style="{ \'color\' : (catch.liked) ? \'#bd320f\' : \'#c2c2d6\' }">{{catch.likes}}</p> <div class="material-icons" aria-label="Favorite" ng-style="{\'color\' : (catch.liked) ? \'#bd320f\' : \'#c2c2d6\' }" ng-click="likePhoto(catch)">favorite</div> </div> </div> <a ng-href="#/catch/{{catch.id}}"><img ng-src="{{catch.fishPhoto}}" class="img-responsive fish-photo"></a> <div class="stream-item__body"> <div layout> <div layout="column" flex> <p class="md-body-1"><a ng-href="#/user/{{catch.owner.id}}">{{catch.location}}</a></p> <p class="md-subhead">{{catch.title}}</p> </div> <div layout="column"> <p class="md-caption"><a ng-href="#/catch/{{catch.id}}" am-time-ago="catch.created_at"></a></p> <p class="md-body-1" ng-show="catch.length>0">{{catch.length}} inches </p> </div> </div> <div class="comments" ng-init="catch.commentLimit=3"> <p class="md-caption" ng-repeat="comment in catch.comments | limitTo:catch.commentLimit"><a ng-href="#/user/{{comment.owner.id}}">{{comment.owner.username}}</a> {{ comment.text }}</p> <md-button class="md-accent" ng-show="catch.comments.length > catch.commentLimit && catch.commentLimit != null" ng-click="toggleComments(catch)">See all...</md-button> <md-button class="md-accent" ng-show="catch.commentLimit == null" ng-click="toggleComments(catch)">Collapse...</md-button> </div> <div layout layout-align="space-between end"> <md-input-container flex="60"> <label>Comment</label> <input ng-model="catch.newComment.text"> </md-input-container> <md-button class="md-raised md-primary" ng-show="catch.newComment.text.length > 0" ng-click="postComment(catch,catch.newComment.text)">Submit</md-button> </div> </div> </div> <div layout> <md-button class="md-accent" ng-click="loadMoreCatches()" flex>Load more...</md-button> </div> <md-fab-speed-dial md-direction="up" class="md-fab-bottom-right md-scale" md-open="isOpen" ng-mouseenter="isOpen=true" ng-mouseleave="isOpen=false"> <md-fab-trigger> <md-button aria-label="Add" class="md-fab md-accent material-icons">add</md-button> </md-fab-trigger> <md-fab-actions> <a ng-href="#/upload"><md-button aria-label="Photo" class="md-fab md-accent md-raised md-mini material-icons">insert_photo</md-button></a> </md-fab-actions> </md-fab-speed-dial> </div>'),a.put("views/upload.html",'<div class="container photo-upload-view"> <p class="md-display-3 text-center" ng-show="picFile.result">Upload Successful!</p> <form name="myForm"> <div class="form-group"> <!-- Upload photo screen of upload process --> <div ng-hide="photoSelected || photoDetailsCompleted"> <!-- Navigation buttons --> <div ng-show="picFile"> <p class="md-display-2 text-center">Photo preview</p> <div class="upload-container" layout> <md-button class="md-raised" ng-click="picFile=null" flex>BACK</md-button> <div flex></div> <md-button class="md-raised md-accent" ng-disabled="!myForm.$valid" ng-click="selectPhoto()" flex>NEXT</md-button> </div> </div> <div layout="column" ng-hide="picFile"> <p class="md-display-2 text-center">Share a photo</p> <div class="upload-container" layout> <md-button ng-href="#/stream" class="md-raised" flex>BACK</md-button> <div flex></div> <md-button input class="md-raised md-accent" type="file" ngf-select ng-model="picFile" name="file" accept="image/*" ngf-resize-if="$width > 800" ngf-resize="{width: 800, quality: 1.0, centerCrop: true}" required flex> BROWSE </md-button> </div> <img class="photo-upload-area" src="images/photo-upload.svg" width="600px"> </div> <img ng-show="myForm.file.$valid" ngf-thumbnail="picFile" class="img-responsive"> </div> <!-- Photo detail screen of upload process --> <div ng-show="photoSelected"> <p class="md-display-2 text-center">Photo details</p> <div class="upload-container"> <!-- Navigation buttons --> <div layout> <md-button class="md-raised" ng-click="photoSelected=false" flex>BACK</md-button> <div flex></div> <md-button class="md-raised md-accent" ng-disabled="!myForm.$valid" ng-click="completePhotoDetails()" ng-show="picFile" flex>NEXT</md-button> </div> <!-- Photo details input --> <md-input-container flex> <label>Describe this photo</label> <input ng-model="title"> </md-input-container> <md-input-container flex> <label>Where was this photo taken?</label> <input ng-model="location"> </md-input-container> </div> </div> <!-- Fish detail screen of upload process --> <div ng-show="photoDetailsCompleted"> <p class="md-display-2 text-center">Fish details</p> <div class="upload-container"> <!-- Navigation buttons --> <div layout> <md-button class="md-raised" ng-click="unCompletePhotoDetails()" flex>BACK</md-button> <div flex></div> <md-button class="md-raised md-accent" ng-disabled="!myForm.$valid" ng-click="uploadPic(picFile)" ng-show="picFile" flex>Submit</md-button> </div> <!-- Fish details input --> <div layout layout-align="start center"> <p flex>Length</p> <p>{{ length }} inches</p> </div> <md-slider flex min="0" max="100" ng-model="length" aria-label="length" id="length-slider"></md-slider> <div layout layout-align="start center"> <p flex>Weight - disabled</p> <p>{{ weight }} lbs</p> </div> <md-slider flex min="0" max="100" ng-model="weight" aria-label="weight" id="weight-slider"></md-slider> <p>Tags</p> <md-chips class="md-primary" ng-model="tags"></md-chips> </div> </div> <span class="progress" ng-show="picFile.progress >= 0"> <div style="width:{{picFile.progress}}%" ng-bind="picFile.progress + \'%\'"></div> </span> <span class="err" ng-show="errorMsg">{{errorMsg}}</span> </div> </form></div>'),a.put("views/user.html",'<header> <md-toolbar> <div class="md-toolbar-tools" layout-align="center end"> <a ng-href="#/stream"><h1> angler</h1></a> <div flex></div> <a ng-href="#/search" class="material-icons" layout-margin>search</a> <a ng-href="#/user/{{currentUser.id}}" class="material-icons" layout-margin>person</a> </div> </md-toolbar> </header> <div class="container"> <div class="user-card"> <div layout layout-align="start start"> <img src="images/avatar.png" alt="avatar"> <div layout="column"> <p class="md-title">{{user.username}}</p> <p class="md-body-1">Brooklyn, NY</p> </div> </div> <div layout layout-align="end end"> <p class="md-body-1">{{user.userprofile.bio}}</p><p> <div flex></div> <div layout="column" layout-align="center end" ng-hide="user.username == currentUser.username"> <p class="md-caption" ng-show="user.is_following == true">You follow this user.</p> <div class="material-icons" ng-click="follow(user)" ng-style="{ \'color\' : (user.is_following) ? \'#bd320f\' : \'#c2c2d6\' }">person_add</div> </div> <div layout="column" layout-align="start end" ng-show="user.username == currentUser.username"> <p class="md-body-1" flex><a ng-href="#/userprofile">Edit profile</a></p> <p class="md-body-1" flex><a href="" ng-click="confirmLogout()">Log out</a></p> </div> </p></div> <!-- div layout layout-align="start start" class="user-favorite-section">\n            <a href="#" flex><span class="material-icons">location_on</span> Lake Mendota</a>\n            <a href="#" flex><span class="material-icons">directions_boat</span> Trout</a>\n            <a href="#"><span class="material-icons">adb</span> Fly</a>         \n        </div --> </div> <div class="user-card"> <div layout> <p class="md-body-1" flex="50">Following: <a ng-href="#/userprofile">{{user.following}}</a></p> <p class="md-body-1" flex="50">Followers: <a ng-href="#/userprofile">{{user.followers}}</a></p> </div> </div> <div class="user-grid" layout-wrap layout="row"> <div flex="33" layout layout-align="center center" ng-repeat="catch in user.catches | orderBy: \'-created_at\'"> <a ng-href="#/catch/{{catch.id}}"><img ng-src="{{catch.fishPhoto}}"></a> </div> </div> </div>'),a.put("views/userprofile.html",'<header> <md-toolbar> <div class="md-toolbar-tools" layout-align="center end"> <a ng-href="#/stream"><h1> angler</h1></a> <div flex></div> <a ng-href="#/search" class="material-icons" layout-margin>search</a> <a ng-href="#/user/{{currentUser.id}}" class="material-icons" layout-margin>person</a> </div> </md-toolbar> </header> <div id="userProfile_view" class="container"> <p class="md-display-2 text-center">Edit your profile</p> <div ng-if="complete == false" layout="column"> <form role="form" ng-if="authenticated" name="userProfileForm" ng-submit="updateProfile(userProfileForm, model)" novalidate> <md-input-container flex> <label for="id_first_name">First Name</label> <input name="first_name" id="id_first_name" class="form-control" type="text" ng-model="model.first_name"> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.first_name">{{error}}</div> <md-input-container flex> <label for="id_last_name">Last Name</label> <input name="last_name" id="id_last_name" class="form-control" type="text" ng-model="model.last_name"> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.last_name">{{error}}</div> <md-input-container flex> <label for="id_email">Email</label> <input name="email" id="id_email" class="form-control" type="email" ng-model="model.email" required> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.email">{{error}}</div> <md-input-container flex> <label for="id_bio">Bio</label> <input name="bio" id="id_bio" class="form-control" type="text" ng-model="model.bio"> </md-input-container> <div class="alert alert-danger" ng-repeat="error in errors.bio">{{error}}</div> <md-button type="submit" class="md-raised md-accent" ng-show="authenticated">Save</md-button> </form> <div class="alert alert-warning" ng-if="authenticated == false">You need to be logged in to do this.</div> </div> <div ng-if="complete == true"> <div class="alert alert-success">Your profile information has been saved!</div> </div> </div>')}]);