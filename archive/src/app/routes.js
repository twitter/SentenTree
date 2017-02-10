/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
  'use strict';
  return app.getNgModule().config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/page1', {
      templateUrl: 'app/pages/page1.html',
      controller: 'page1Ctrl'
    });

    $routeProvider.when('/sample', {
      templateUrl: 'app/pages/sample.html',
      controller: 'sampleCtrl'
    });

    // $routeProvider.when('/view2', {
    //   templateUrl: 'partial/sample2.html',
    //   controller: 'mainCtrl'
    // });

    $routeProvider.otherwise({
      redirectTo: '/page1'
    });
  }]);
});