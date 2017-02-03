define([
  'app/directives/directives',
  'pure/js/sententree/tokenizer',
  'pure/js/sententree/filter',
  'pure/js/sententree/graphBuilder',
],
function (directives, tokenizer, filter, graphBuilder) {
  'use strict';
//---------------------------------------------------
// BEGIN code for this directive
//---------------------------------------------------

directives.directive('sentenforest', ['safeApply', function (safeApply){
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'app/directives/sentenforest-directive.html',
    scope:{
      tweets: '=',
      terms: '='
    },
    controller: function($scope) {
      var trees = [];
      this.addTree = function(tree) {
        trees.push(tree);
      };

      this.zoomin = function(zoomTree, zoomNode) {
        angular.forEach(trees, function(tree) {
          if( tree != zoomTree ) {
            tree.showMe = false;
          }
        });        
        safeApply($scope, function() {
          var result = graphBuilder.updateGraphs($scope.tokens, $scope.passTerms, $scope.rootSeq, $scope.minSupport, $scope.maxSupport, $scope.graphs, zoomNode.seq);
          $scope.rootSeq = result.root;
          $scope.graphs = result.graphs;
          $scope.graphsFreqMax = result.graphsFreqMax;
          $scope.graphsFreqMin = result.graphsFreqMin;
        });
        

        zoomTree.showView();
      };

      $scope.zoomout = function() {
        safeApply($scope, function() {
          var result = graphBuilder.updateGraphs($scope.tokens, $scope.passTerms, $scope.rootSeq, $scope.minSupport, $scope.maxSupport, $scope.graphs, null);
          $scope.rootSeq = result.root;
          $scope.graphs = result.graphs;
          $scope.graphsFreqMax = result.graphsFreqMax;
          $scope.graphsFreqMin = result.graphsFreqMin;
        });
        angular.forEach(trees, function(tree) {
          tree.showView();
          tree.showMe = true;
        });
      };

      this.dimAll = function(undimTree) {
        angular.forEach(trees, function(tree) {
          if( tree != undimTree )
            tree.dimView();
        });
      }

      this.undimAll = function() {
        angular.forEach(trees, function(tree) {
          tree.undimView();
        });
      }
    },
    link: function(scope, elements, attrs) {
      scope.items2text = function(s) {
        if(!scope.tokens || !scope.tokens.itemset || !s || s.length < 1 )
          return '';
        var t = scope.tokens.itemset[s[0]];
        for(var i = 1; i < s.length; i++ )
          t += ' ' + scope.tokens.itemset[s[i]];
        return t;
      }

      scope.$watch('tweets', function() {
        var tokenResult = tokenizer.tokenize(scope.tweets, true);
        // TODO: remove filter.removeStopwords, add stopwords to terms
        if( tokenResult != null )
          scope.tokens = filter.removeStopwords(tokenResult);/*, scope.terms);*/
      });

      scope.$watch('tokens', function(){
        var passTerms = {};
        for( var key in scope.terms ) {
          if( key in scope.tokens.vocab )
            passTerms[scope.tokens.vocab[key]] = scope.terms[key];
        }
        console.log(passTerms);
        scope.passTerms = passTerms;
       /*
        var graphs = graphBuilder.growGraphs(scope.tokens, passTerms);

        // display only graph with >2 nodes
        scope.graphs = graphs.filter(function(graph){
          return graph.nodes.length > 2;
        }).slice(0,10);
        */

        var result = graphBuilder.initGraphs(scope.tokens, scope.passTerms);
        scope.rootSeq = result.root;
        scope.minSupport = result.minSupport; 
        scope.maxSupport = result.maxSupport;
        scope.graphs = result.graphs;  
        scope.graphsFreqMax = result.graphsFreqMax;
        scope.graphsFreqMin = result.graphsFreqMin;
        console.log("Finished building graph. Start vis.");
      });
    }
  };
}]);

//---------------------------------------------------
// END code for this directive
//---------------------------------------------------
});