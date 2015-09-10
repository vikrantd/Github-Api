'use strict';

/**
 * Config for the router
 */
app.run(function ($rootScope,   $state,   $stateParams) {
          

          $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
          $rootScope.toState = toState;
          $rootScope.toStateParams = toStateParams;
            
        });




    }
    
  )
  .config(
    
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/main');
          $stateProvider
              
              .state('main', {
                  url: '/main',
                  templateUrl: 'tpl/main.html',
                  controller: 'AppCtrl'
              })
                
      }
    
  );