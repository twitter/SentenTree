define([
  'app/common/filters/filters',
  // If you create a new filter and want to use in angular
  // Please add it to the list below, in alphabetical order.
  'pure/js/filters/formatBigNumber-filter'
],
function(filters){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

var args = Array.prototype.slice.call(arguments, 1);

// For each of the filters listed above
args.forEach(function(filter){
  // Create angular filter with
  // filter name = filter.name
  // filter function = filter.filter
  filters.filter(filter.name, function(){
    return filter.filter;
  });
});

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});