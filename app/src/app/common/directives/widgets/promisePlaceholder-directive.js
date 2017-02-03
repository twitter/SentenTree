define([
  'app/directives/directives'
],
function (ngModule) {
  'use strict';
//---------------------------------------------------
// BEGIN code for this directive
//---------------------------------------------------

ngModule.directive('promisePlaceholder', ['safeApply', function (safeApply){
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    scope:{
      promise: '=',
      retryFunction: '&'
    },
    templateUrl: 'app/common/directives/widgets/promisePlaceholder-directive.html',
    // controller: function($scope){
    //   $scope.isLoading = true;
    // },
    link: function(scope, element, attrs) {

      if(attrs.retryFunction !== undefined && attrs.retryFunction !== null){
        scope.hasRetryFunction = true;
      }

      var mode = attrs.mode ? attrs.mode : 'block';
      var style = {};

      switch(mode){
        case 'block':
          style.display = 'block';
          break;
        case 'inline-block':
          style.display = 'inline-block';
      }

      if(attrs.width){
        style.width = attrs.width + 'px';
      }
      if(attrs.height){
        style.height = attrs.height + 'px';
      }

      scope.style = style;

      scope.$watch('promise', function(){
        if(scope.promise){
          scope.isLoading = true;

          if(typeof scope.promise.then === 'function'){
            scope.promise.then(
              function successHandler(data){
                safeApply(scope, function(){
                  scope.isLoading = false;
                  scope.isSuccess = true;
                  scope.isError   = false;
                  // scope.outputError = null;
                  // scope.outputData = data;
                });
              },
              function errorHandler(error){
                safeApply(scope, function(){
                  scope.isLoading = false;
                  scope.isSuccess = false;
                  scope.isError   = true;
                  scope.outputError = error;
                  // scope.outputData = null;
                });
              }
            );
          }
          else{
            scope.isLoading = false;
            scope.isError = true;
            scope.outputError = 'invalid promise: '+scope.promise;
          }

        }
      });

      scope.retry = function(){
        scope.promise = scope.retryFunction();
      };

    }
  };
}]);

//---------------------------------------------------
// END code for this directive
//---------------------------------------------------
});