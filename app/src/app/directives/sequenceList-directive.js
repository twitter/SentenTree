define([
  'app/directives/directives'
],
function (directives) {
  'use strict';
//---------------------------------------------------
// BEGIN code for this directive
//---------------------------------------------------

directives.directive('sequenceList', [function (){
  return {
    restrict: 'AE',
    replace: true,
    // template: '<div>test template</div>',
    templateUrl: 'app/directives/sequenceList-directive.html',
    scope:{
      sequences: '=',
      selectedseq: '='
    },
    link: function(scope, element, attrs) {
      scope.setSelSeq = function(seq) {
        scope.selectedseq = seq;
      }
    }
  };
}]);
1
//---------------------------------------------------
// END code for this directive
//---------------------------------------------------
});