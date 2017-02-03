/**
 * loads sub modules and wraps them up into the main module
 */
define([
  'domReady',
  'angular',

  /*
   * Load angular modules
   * if you get 'unknown {x}Provider' errors from angular, be sure they are
   * properly referenced in one of the module dependencies below.
   */

  // ---------------------------------------------------
  // External modules
  // ---------------------------------------------------
  'angular-route',
  'angular-bootstrap',
  'angular-knife',
  'angular-sstooltip',

  // ---------------------------------------------------
  // Internal modules
  // ---------------------------------------------------

  // Core modules
  'app/pages/controllers',
  'app/directives/directives',
  'app/common/filters/filters',
  'app/common/services/services',

  'app/common/services/eventRepeater-service',
  'app/common/services/tweetData-service',

  'app/common/directives/widgets/promisePlaceholder-directive',

  // Highest level controller
  'app/pages/main-controller',
  // Per-page controller
  'app/pages/page-controller',
  
  'app/directives/sequenceList-directive',
  'app/directives/seqtreeTable-directive',
  'app/directives/sentenforest-directive',
  'app/directives/sententree-directive',

  /*
   * Import custom filters to angular modules automatically
   * List of filters to be imported are in
   * filter/ngFilterAdapter.js
   */
  'app/common/filters/ngFilterAdapter'
], function (domReady, angular) {
  'use strict';

  var app = angular.module('app', [
    // black magic: not sure why but don't change the position of ngRoute
    // otherwise it will break the test runner
    'ngRoute',

    'ngKnife',
    'sstooltip',
    'ui.bootstrap',

    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services'
  ]);

  // Kickstart application
  function bootstrap(){
    domReady(function (document) {
      angular.bootstrap(document, ['app']);
    });
  }

  return {
    bootstrap: bootstrap,
    getNgModule: function(){ return app; }
  };
});
