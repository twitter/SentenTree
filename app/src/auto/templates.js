// DEAR BRAVE DEVELOPER, 
// THIS FILE IS AUTO-GENERATED FROM GRUNT, SO DO NOT MODIFY ANYTHING
// UNLESS YOU WANT TO WASTE YOUR EFFORT OR REALLY KNOW WHAT YOU ARE DOING.
// WITH LOVE, 
// -- The person who creates this file.


define(['app/app'], function(app){ app.getNgModule().run(['$templateCache', function($templateCache){   'use strict';

  $templateCache.put('app/common/directives/categoricalLegend-directive.html',
    "<div class=\"chart-legend\">\n" +
    "  <div class=\"legend-block\" ng-repeat=\"category in categories\">\n" +
    "    <div class=\"legend-color-sample\" ng-style=\"legendStyle(category)\"></div>{{category}}\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('app/common/directives/widgets/promisePlaceholder-directive.html',
    "<div>\n" +
    "  <div ng-show=\"isLoading\" ng-style=\"style\" class=\"placeholder\">\n" +
    "    <img src=\"images/loader/danceDuck.gif\" alt=\"\">\n" +
    "    <div class=\"loading-title\">\n" +
    "      loading...\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"!isLoading\" class=\"actual-content\">\n" +
    "    <div ng-if=\"isError\">\n" +
    "      <div ng-if=\"hasRetryFunction\" class=\"ss-content-center\">\n" +
    "        <button class=\"btn btn-warning\" ng-click=\"retry()\">\n" +
    "          Retry&nbsp;&nbsp;<i class=\"glyphicon glyphicon-refresh\"></i>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "      Error:\n" +
    "      <div hljs language=\"js\" source=\"outputError | json\"></div>\n" +
    "    </div>\n" +
    "    <div ng-show=\"isSuccess\">\n" +
    "      <div ng-transclude></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('app/directives/nodeTooltip.html',
    "{{data.entity}}:{{data.freq}}\n" +
    "<div class=\"my-tweet-tooltip\"></div>"
  );


  $templateCache.put('app/directives/sentenforest-directive.html',
    "<div>\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t<button ng-click=\"zoomout()\" type=\"submit\" class=\"btn btn-default\">Reset view</button>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<sententree ng-repeat=\"g in graphs\" graph=\"g\" width=\"1230\" height=\"300\"></sententree>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('app/directives/sententree-directive.html',
    "<div class=\"sententreeContainer\" ng-show=\"showMe\">\n" +
    "  \n" +
    "  <div><p>{{graph.id}}</p></div>\n" +
    "  <svg></svg>\n" +
    "  <div sstooltip tooltip-key=\"node\" tooltip-src=\"'app/directives/nodeTooltip.html'\" tooltip-theme=\"sententree\"></div>\n" +
    "</div>"
  );


  $templateCache.put('app/directives/seqtreeTable-directive.html',
    "<div class=\"seqtree-table\">\n" +
    "\t<table>\n" +
    "\t  <tr ng-repeat=\"r in patterns\">\n" +
    "\t    <td ng-repeat=\"c in r track by $index\">\n" +
    "        <span ng-if=\"c.isAlignment\">\n" +
    "          <b>\n" +
    "            {{c.chunk}}\n" +
    "          </b>\n" +
    "        </span>\n" +
    "        <span ng-if=\"!c.isAlignment\">\n" +
    "          {{c.chunk}}\n" +
    "        </span>\n" +
    "\t    </td>\n" +
    "\t  </tr>\n" +
    "\t</table>\n" +
    "</div>"
  );


  $templateCache.put('app/directives/sequenceList-directive.html',
    "<div>\n" +
    "\t<button ng-repeat=\"seq in sequences\" ng-click=\"setSelSeq(seq.slice(1))\">\n" +
    "\t\t{{seq.slice(1).join(' ') + ' (' + seq[0] + ')'}}\n" +
    "\t</button>\n" +
    "</div>"
  );
}]); });