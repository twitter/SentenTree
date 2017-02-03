define([
  'app/pages/controllers',
  'd3'
],
function (ngModule, d3){
  'use strict';
//---------------------------------------------------
// BEGIN code for this service
//---------------------------------------------------

ngModule.controller('mainCtrl', ['$scope', 'safeApply', 'sstooltipManager', function ($scope, safeApply, sstooltipManager){
  $scope.dataFiles = [
    {seq:'goal1seq.txt', tweets:'raw/goal1.tsv'},
    {seq:'goal2seq.txt', tweets:'raw/goal2.tsv'},
    {seq:'goal3seq.txt', tweets:'raw/goal3.tsv'},
    {seq:'goal4seq.txt', tweets:'raw/goal4.tsv'},
    {seq:'testseq.txt',  tweets:'raw/test.tsv'},
  ];
  $scope.selectedData = $scope.dataFiles[4];
  $scope.sequence = [];
  $scope.tweets = [];


  $scope.loadSeqs = function(dataFile){
    $scope.selectedData = dataFile;

    d3.text('data/'+dataFile.seq, function(text) {
      safeApply($scope, function(){
        $scope.closedSeqs = d3.dsv(" ", "text/plain").parseRows(text);
        $scope.sequence = $scope.closedSeqs[0].slice(1);
        $scope.loadTweets();
      });
    });
 }  

  $scope.loadTweets = function() {
    console.log("load tweets");
    d3.text('data/'+$scope.selectedData.tweets, function(text) {
      safeApply($scope, function(){
        $scope.tweets = d3.tsv.parseRows(text);
      });
    });
  }

  $scope.testFunc = function(row){
  	console.log("I am here!", row);
  }

  $scope.loadSeqs($scope.selectedData);

  $scope.isActive = function(dataFile){
    return dataFile == $scope.selectedData ? 'active' : '';
  };
}]);

//---------------------------------------------------
// END code for this service
//---------------------------------------------------
});