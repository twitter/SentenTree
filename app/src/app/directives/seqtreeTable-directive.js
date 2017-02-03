define([
  'app/directives/directives',
  'lodash'
],
function (directives, _) {
  'use strict';
//---------------------------------------------------
// BEGIN code for this directive
//---------------------------------------------------

directives.directive('seqtreeTable', [function (){
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'app/directives/seqtreeTable-directive.html',
    scope:{
      sequence: '=',
      tweets: '='
    },
    link: function(scope, element, attrs) {
      scope.makeTable = function(){
        console.log("makeTable");
        var seq = scope.sequence;
        var regexp = seq.join('( | .*)');
        var sentPatt = new RegExp(regexp, 'g');

        var cleanedTweets = scope.tweets
          .map(function(row){
            row[1] = row[1].replace(/\\\"/g, '');
            return row;
          })
          .filter(function(row){
            return sentPatt.test(row[1]);
          })

        var groups = _.groupBy(cleanedTweets, function(row){
          var tweet = row[1];
          return tweet
            .replace(/ /g, '')
            .replace(/http:\/\/t.co\/[A-Za-z0-9]*/g, '(link)');
        });

        var finalTweets = Object.keys(groups).map(function(key){
          return groups[key][0];
        });

        // var patterns = finalTweets.map(function(row){
        //   var s = sentPatt.exec(row[1]);
        //   console.log('row[1]', row[1], s);
        //   var r = [];
        //   r.push({
        //     chunk: row[1].slice(0, s.index)
        //   });
        //   for( var i = 0; i < seq.length-1; i++ ) {
        //     r.push({
        //       chunk: seq[i],
        //       isAlignment: true
        //     });
        //     r.push({
        //       chunk: s[i+1]
        //     });
        //   }
        //   r.push({
        //     chunk: seq[seq.length-1],
        //     isAlignment: true
        //   });
        //   r.push({
        //     chunk: row[1].slice(s.index+s[0].length)
        //   });

        //   return r;
        // });

        var patterns = [];
        finalTweets.forEach(function(row) {
          var s = sentPatt.exec(row[1]);
          if( s ) {
            var r = [];
            r.push({
              chunk: row[1].slice(0, s.index)
            });
            for( var i = 0; i < seq.length-1; i++ ) {
              r.push({
                chunk: seq[i],
                isAlignment: true
              });
              r.push({
                chunk: s[i+1]
              });
            }
            r.push({
              chunk: seq[seq.length-1],
              isAlignment: true
            });
            r.push({
              chunk: row[1].slice(s.index+s[0].length)
            });

            patterns.push(r);
          }
        });

        patterns.sort(function(a,b){
          return a[0].chunk.localeCompare(b[0].chunk);
        });

        scope.patterns = patterns;
      };

      scope.$watch('sequence', scope.makeTable);
      scope.$watch('tweets', scope.makeTable);
    }
  };
}]);

//---------------------------------------------------
// END code for this directive
//---------------------------------------------------
});