// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])
  .config(['$sceProvider', function($sceProvider){
    //to disable url blacklisting
    $sceProvider.enabled(false);
  }])

 
  .directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
  }])
  .filter('dateformat', function () {
        return function (text) {
            console.log(text);
            var str = text.toString();
            console.log(str);
            return str.slice(14,25);
        };
   })
  .filter('emailfilter', function () {
        return function (text) {
            if(text != "")
            {
              var str = text.toString();
              if(str != undefined)
              {
              var res = str.split("E-mail: ");
              var res2;
              if(res[1])
              {
                res2 = res[1].split("-------");
                if(res2[0])
                {
                  return "E-mail: " + res2[0];
                }
                else return "-";
              }
              else return "-";
              //console.log(res[1]);
              //console.log(res2[0]);
              
              
              }
            }
            else return "-";
            
        };
   })
 
  //to make contact between scope and formcontroller
  .service('controllershake', function ControllerShake(){
    
    var controllershake = this;
    
    
  });

