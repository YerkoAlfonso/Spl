angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.vueloOrdinario', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/vueloOrdinario.html',
        controller: 'vueloOrdinarioCtrl'
      }
    }
  })

  .state('menu.vueloEspecial', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/vueloEspecial.html',
        controller: 'vueloEspecialCtrl'
      }
    }
  })

  .state('menu.cloud', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cloud.html',
        controller: 'cloudCtrl'
      }
    }
  })


  // Vista Pdf


 .state('menu.pdf2', {
    url: '/pdf2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pdf2.html',
        controller: 'pdf2Ctrl'
      }
    }
  })
 


  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.tiempoDeVuelo', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tiempoDeVuelo.html',
        controller: 'tiempoDeVueloCtrl'
      }
    }
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('page', {
    url: '/page7',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('menu.seleccioneTipoVuelo', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/seleccioneTipoVuelo.html',
        controller: 'seleccioneTipoVueloCtrl'
      }
    }
  })

 

  .state('menu.calendario', {
     cache: false,
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/calendario.html',
        controller: 'calendarioCtrl'
      }
    }
  })

  .state('menu.calendarioTV', {
     cache: false,
    url: '/calendarioTVPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/calendarioTV.html',
        controller: 'calendarioTvCtrol'
      }
    }
  })

$urlRouterProvider.otherwise('/page5')

  

});