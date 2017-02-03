define([
  './services'
],
function (ngModule){
  'use strict';
//---------------------------------------------------
// BEGIN code for this service
//---------------------------------------------------

ngModule.factory('tweetDataService', ['$q', '$http', function ($q, $http){
  function getDataFromTSVFile(dataFile){
    var deferred = $q.defer();

    d3.text('data/' + dataFile, function(text) {
      var count = 0;
      var data = d3.tsv.parseRows(text, function(row) {
        count += +row[2];
        return {
          id: row[0],
          text: row[1],
          // 'count':Math.log(+row[2])
          // count: 1
          count: +row[2]
        };
      });
      deferred.resolve({
        metadata: {
          name: dataFile,
          count: count
        },
        data: data
      });
    });

    return deferred.promise;
  }

  function getDataFromJSONFile(dataFile) {
    var deferred = $q.defer();

    d3.json('data/' + dataFile, function(error, json) {
      if (error) return console.warn(error);
      var data = json;
      deferred.resolve({
        metadata: {
          name: dataFile
        },
        data: data
      });
    });

    return deferred.promise;
  }

  return{
    getDataFromTSVFile: getDataFromTSVFile,
    getDataFromJSONFile: getDataFromJSONFile
  };
}]);

//---------------------------------------------------
// END code for this service
//---------------------------------------------------
});