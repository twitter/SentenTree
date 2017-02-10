define([
  'app/directives/directives'
],
function (ngModule) {
  'use strict';
//---------------------------------------------------
// BEGIN code for this directive
//---------------------------------------------------

ngModule.directive('categoricalLegend', [function (){
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/app/common/directives/categoricalLegend-directive.html',
    scope:{
      categories: '=',
      colorScale: '='
    },
    // controller: function($scope){

    // },
    link: function(scope, element, attrs) {
      scope.legendStyle = function(category){
        return {
          'background-color': scope.colorScale ? scope.colorScale(category) : null
        };
      };
    }
  };
}]);

//---------------------------------------------------
// END code for this directive
//---------------------------------------------------
});