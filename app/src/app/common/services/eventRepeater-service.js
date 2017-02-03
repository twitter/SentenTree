define([
  'angular',
  'd3',
  'app/common/services/services'
],
function (angular, d3, services){
  'use strict';
//---------------------------------------------------
// BEGIN code for this service
//---------------------------------------------------

services.factory('eventRepeaterService', [function (){

  function listenAndEmitSingleEvent(scope, source, prefix, eventName, dataFn){
    source.on(eventName, function(){
      var args = Array.prototype.slice.call(arguments);
      scope.$emit(prefix + eventName, dataFn ? dataFn.apply(this, args) : args);
    });
  }

  function listenAndEmit(scope, source, prefix, eventNames, dataFn){
    if(angular.isArray(eventNames)){
      eventNames.forEach(function(eventName){
        listenAndEmitSingleEvent(scope, source, prefix, eventName, dataFn);
      });
    }
    else{
      listenAndEmitSingleEvent(scope, source, prefix, eventNames, dataFn);
    }
  }

  function listenAndEmitD3Events(scope, source, prefix, eventNames){
    listenAndEmit(scope, source, prefix, eventNames, function(d, i){
      return {
        data : d,
        index: i,
        mouseEvent: d3.event
      };
    });
  }

  return{
    listenAndEmit: listenAndEmit,
    listenAndEmitD3Events: listenAndEmitD3Events
  };
}]);

//---------------------------------------------------
// END code for this service
//---------------------------------------------------
});