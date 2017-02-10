define([
],
function () {
  'use strict';
//---------------------------------------------------
// BEGIN code for this filter
//---------------------------------------------------

return{
  name: 'formatBigNumber',
  filter: function(n, decDigits, type) {
    if(n===null || n===undefined || isNaN(n) || n==='' || n==='null' || n==='undefined'){
      return '-';
    }

    n = +n;
    var fractionDigits = 0;
    var sign = n >= 0 ? '' : '-';
    n = Math.abs(n);
    fractionDigits = (decDigits) ? decDigits : 0;

    if(n < 1000){
      return sign + n.toFixed(fractionDigits);
    }
    else if(n < 1000000){
      return sign + (n/1000).toFixed(fractionDigits) + (type === 'bytes' ? ' KB' : ' K');
    }
    else if(n < 1000000000){
      return sign + (n/1000000).toFixed(fractionDigits) + (type === 'bytes' ? ' MB' : ' M');
    }
    else if(n < 1000000000000){
      return sign + (n/1000000000).toFixed(fractionDigits) + (type === 'bytes' ? ' GB' : ' B');
    }
    else if(n < 1000000000000000){
      return sign + (n/1000000000000).toFixed(fractionDigits) + (type === 'bytes' ? ' TB' : ' T');
    }

    return n;
  }
};

//---------------------------------------------------
// END code for this filter
//---------------------------------------------------
});