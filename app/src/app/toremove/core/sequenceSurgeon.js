define([
  'lodash'
],
function(_){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

var DEFAULT_MORE_SYMBOL = 'x';
var DEFAULT_DELIMITER = '';

return function SequenceSurgeon(){

  var _delimiter = DEFAULT_DELIMITER;
  var _moreSymbol = DEFAULT_MORE_SYMBOL;

  function delimiter(value){
    if(arguments.length > 0){
      _delimiter = value;
      return this;
    }
    return _delimiter;
  }

  function moreSymbol(value){
    if(arguments.length > 0){
      _moreSymbol = value;
      return this;
    }
    return _moreSymbol;
  }

  function adapt(sequenceArrayOrString, func){
    if(Array.isArray(sequenceArrayOrString)){
      return func.call(this, sequenceArrayOrString);
    }
    else{
      return func.call(this, sequenceArrayOrString.split(_delimiter)).join(_delimiter);
    }
  }

  function remapSymbols(sequenceArrayOrString, map){
    return adapt(sequenceArrayOrString, function(sequence){
      return sequence.map(function(symbol){
        return map[symbol] ? map[symbol] : '';
      });
    });
  }

  function sortSymbols(sequenceArrayOrString){
    return adapt(sequenceArrayOrString, function(sequence){
      return sequence.sort(function(a,b){ return a.localeCompare(b); });
    });
  }

  function removeDuplicateConsecutiveSymbols(sequenceArrayOrString, includedSymbols, excludedSymbols){
    var hasInclude = includedSymbols && includedSymbols.length > 0;
    var hasExclude = excludedSymbols && excludedSymbols.length > 0;
    var includeLookup = {};
    var excludeLookup = {};
    if(hasInclude){
      includedSymbols.forEach(function(symbol){
        includeLookup[symbol] = true;
      });
    }
    if(hasExclude){
      excludedSymbols.forEach(function(symbol){
        excludeLookup[symbol] = true;
      });
    }

    return adapt(sequenceArrayOrString, function(sequence){
      var output = [];
      var prevSymbol = '';
      sequence.forEach(function(symbol){
        if(symbol!=prevSymbol || (symbol==prevSymbol && (hasInclude && !includeLookup[symbol] || hasExclude && excludeLookup[symbol])) ){
          output.push(symbol);
        }
        prevSymbol = symbol;
      });
      return output;
    });
  }

  function partitionByAlignments(sequenceArrayOrString, alignments){
    var isArray = Array.isArray(sequenceArrayOrString);
    sequence = isArray ? sequenceArrayOrString : sequenceArrayOrString.split(_delimiter);

    var partitions = [];
    for(var i=0;i<alignments.length;i++){
      var index = sequence.indexOf(alignments[i]);
      if(index >= 0){
        partitions.push({
          partitionIndex: partitions.length,
          sequence: sequence.slice(0,index)
        });
        sequence = sequence.slice(index+1);
      }
      else{
        break;
      }
    }
    // leftover
    if(partitions.length>0 && sequence.length>0){
      partitions.push({
        partitionIndex: partitions.length,
        sequence: sequence
      });
    }

    if(!isArray){
      partitions.forEach(function(partition){
        partition.sequence = partition.sequence.join(_delimiter);
      });
    }
    return partitions;
  }

  function reverse(sequenceArrayOrString){
    return adapt(sequenceArrayOrString, function(sequence){
      return sequence.reverse();
    });
  }

  function truncateBack(sequenceArrayOrString, maxLength){
    return adapt(sequenceArrayOrString, function(sequence){
      if(sequence.length <= maxLength){
        return sequence;
      }
      else{
        sequence = sequence.slice(0, maxLength-1);
        sequence.push(_moreSymbol);
        return sequence;
      }
    });
  }

  function truncateFront(sequenceArrayOrString, maxLength){
    return reverse(truncateBack(reverse(sequenceArrayOrString), maxLength));
  }

  return {
    delimiter: delimiter,
    moreSymbol: moreSymbol,
    partitionByAlignments: partitionByAlignments,
    remapSymbols: remapSymbols,
    removeDuplicateConsecutiveSymbols: removeDuplicateConsecutiveSymbols,
    reverse: reverse,
    sortSymbols: sortSymbols,
    truncateBack: truncateBack,
    truncateFront: truncateFront
  };
};

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});