define([
  'app/pages/controllers',
  'd3'
], function (ngModule, d3) {
  'use strict';

//---------------------------------------------------
// BEGIN code for this service
//---------------------------------------------------

ngModule.controller('pageCtrl', ['$scope', 'safeApply', 'sstooltipManager', 'dateFilter', 'tweetDataService', function ($scope, safeApply, sstooltipManager, dateFilter, tweetDataService){
  $scope.dataFiles = ['test.tsv', 
                      'goal1.tsv', 
                      'goal2.tsv', 
                      'goal3.tsv', 
                      'goal4.tsv',
                      'sochidogs.tsv', 
                      'vis14.tsv', 
                      'eat24.tsv', 
                      'robin_williams.json', 
                      'yosemite.json', 
                      'kindle.tsv',
                      'lostsymbol.tsv', 
                      'oscars2015.tsv',
                      'samsung-tvs.tsv', 
                      'genesis-reviews.tsv', 
                      'genesis-and-forum.tsv', 
                      'dowjones.tsv', 
                      'superbowl2015.tsv',
                      'reddit_apple_467bsj.tsv',
                      'reddit_zuckerberg_3v1z0d.tsv'];
  $scope.selectedData = $scope.dataFiles[0];
  $scope.graphs = [];
  $scope.tokens = null;

  $scope.promises = {};

  $scope.loadTweetFile = function(dataFile) {
    $scope.selectedData = dataFile;
    console.log(dataFile);
    if( dataFile.indexOf('.tsv', dataFile.length-4) > -1)
      $scope.promises.tweets = tweetDataService.getDataFromTSVFile(dataFile);
    else if( dataFile.indexOf('.json', dataFile.length-5) > -1) 
      $scope.promises.tweets = tweetDataService.getDataFromJSONFile(dataFile);
    console.log("start building graphs");
    $scope.promises.tweets.then(function(data){
      safeApply($scope, function() {
        $scope.metadata = data.metadata;
        $scope.tweets = data.data;
        if( dataFile.indexOf('goal') == 0 ) 
          $scope.terms = {'world':2, 'cup':2, 'brazil':1};
        else if( dataFile.indexOf('vis14') == 0 ) 
          $scope.terms = {'#ieeevis':2};
        else if( dataFile.indexOf('alexfromtarget') == 0 ) 
          $scope.terms = {'#alexfromtarget':2};
        else if( dataFile.indexOf('superbowl') == 0 )
          $scope.terms = {'superbowl':2};
        else if( dataFile.indexOf('oscars') == 0 ) 
          $scope.terms = {'oscars':2};
        else if( dataFile.indexOf('yosemite') == 0 )
          $scope.terms = {'yosemite':1};
        else if( dataFile.indexOf('robin_williams') == 0 )
          $scope.terms = {'robin':2, 'williams':2};
        else if( dataFile.indexOf('kindle') == 0 )
          $scope.terms = {'kindle':1, 'dx':1};
        else if( dataFile.indexOf('genesis') == 0 )
          $scope.terms = {'car':1, 'genesis':1, 'direct':20, 'view':20, 'f12c019':20};
        else if( dataFile.indexOf('lostsymbol') == 0 )
          $scope.terms = {'dan':2, 'brown':2, 'lost':2, 'symbol':2, 'book':1};
        else if( dataFile.indexOf('samsung-tvs') == 0 )
          $scope.terms = {'tv':1, 'samsung':1};
        else if( dataFile.indexOf('bangkok') == 0 )
          $scope.terms = {'#prayforbangkok':1};
        else
          $scope.terms = {};
      });
    });
  };

//  $scope.loadTweetFile($scope.dataFiles[2]);

  $scope.isActive = function(dataFile){
    return dataFile == $scope.selectedData ? 'active' : '';
  };

  // ---------------------------------------------------
  // Start form
  // ---------------------------------------------------

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    showWeeks: false
  };

  $scope.loadTweetsParams = {
    term: 'yosemite',
    limit: 1000,
    minTime: new Date(2014, 7, 1),
    maxTime: new Date(2014, 7, 2)
  };
  $scope.minDateOpen = false;
  $scope.maxDateOpen = false;
  $scope.openMinDatePicker = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.minDateOpened = true;
  };
  $scope.openMaxDatePicker = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.maxDateOpened = true;
  };

  $scope.loadTweetsBtnClick = function(){
    var loadTweetsParams = $scope.loadTweetsParams;
    var params = {
      term: loadTweetsParams.term,
      limit: loadTweetsParams.limit,
      start_time: dateFilter(loadTweetsParams.minTime, 'yyyy-MM-dd'),
      end_time: dateFilter(loadTweetsParams.maxTime, 'yyyy-MM-dd')
    };

    $scope.promises.tweets = tweetDataService.getDataFromVertica(params);

    $scope.promises.tweets.then(function(data){
      safeApply($scope, function() {
        $scope.metadata = data.metadata;
        $scope.tweets = data.data;
        $scope.terms = $scope.loadTweetsParams.term.split(' ');
      });
    });

    // $http.jsonp('http://birdbrain-dev.local.twitter.com:3000/tools/senten_tree/get_top_tweets?callback=JSON_CALLBACK', {
    //   params: params
    // })
    // .success(function(data, status){
    //   console.log('success', data, status);
    //   safeApply($scope, function() {
    //     $scope.tweets = data;
    //     $scope.terms = $scope.loadTweetsParams.term.split(' ');
    //     if( d3.select("#status div") != null )
    //       d3.select("#status div").text("");
    //   });
    // })
    // .error(function(data, status){
    //   console.log('error', data, status);
    // });
  };

  this.test = function() {
    console.log("test sentenforest");
  }

  // ---------------------------------------------------
  // End form
  // ---------------------------------------------------

}]);

//---------------------------------------------------
// END code for this service
//---------------------------------------------------
});