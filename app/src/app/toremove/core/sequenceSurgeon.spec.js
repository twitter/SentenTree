define(['app/core/sequenceSurgeon'],function(SequenceSurgeon){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------
  describe('SequenceSurgeon', function(){
    var seqSurgeon = new SequenceSurgeon();

    it('should exist', function(){
      /* jshint ignore:start */
      expect(seqSurgeon).to.exist;
      /* jshint ignore:end */
    });

    describe('#partitionByAlignments()', function(){
      it('should return part of sequences before and after alignments', function(){
        expect((seqSurgeon.partitionByAlignments(['a','b', 'c', 'd'], ['b']))).to.eql([
          {partitionIndex: 0, sequence: ['a']},
          {partitionIndex: 1, sequence: ['c', 'd']}
        ]);
        expect((seqSurgeon.partitionByAlignments('abcd', ['b']))).to.eql([
          {partitionIndex: 0, sequence: 'a'},
          {partitionIndex: 1, sequence: 'cd'}
        ]);

        seqSurgeon.delimiter(' ');
        expect((seqSurgeon.partitionByAlignments('This is a book', ['is']))).to.eql([
          {partitionIndex: 0, sequence: 'This'},
          {partitionIndex: 1, sequence: 'a book'}
        ]);
        seqSurgeon.delimiter('');
      });
    });

    describe('#removeDuplicateConsecutiveSymbols()', function(){
      it('should remove duplicate consecutive symbols in the given sequence', function(){
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('cba')).to.equal('cba');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaa')).to.equal('a');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaab')).to.equal('ab');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('')).to.equal('');
      });

      it('should remove only duplicate consecutive symbols in the included list', function(){
        var includedSymbols = ['a', 'b'];

        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('cba', includedSymbols)).to.equal('cba');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaa', includedSymbols)).to.equal('a');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaab', includedSymbols)).to.equal('ab');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aabcccccc', includedSymbols)).to.equal('abcccccc');
      });

      it('should skip symbols in the excluded list', function(){
        var excludedSymbols = ['a'];

        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('cba', null, excludedSymbols)).to.equal('cba');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaa', null, excludedSymbols)).to.equal('aaaa');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaabbb', null, excludedSymbols)).to.equal('aaaab');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aabcccccc', null, excludedSymbols)).to.equal('aabc');
      });

      it('should process symbols in the includes list and skip other symbols', function(){
        var includedSymbols = ['a'];
        var excludedSymbols = ['b'];

        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('cba', includedSymbols, excludedSymbols)).to.equal('cba');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaa', includedSymbols, excludedSymbols)).to.equal('a');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aaaabbb', includedSymbols, excludedSymbols)).to.equal('abbb');
        expect(seqSurgeon.removeDuplicateConsecutiveSymbols('aabbcccccc', includedSymbols, excludedSymbols)).to.equal('abbcccccc');
      });

    });

    describe('#reverse()', function(){
      it('should reverse symbols in the given sequence string', function(){
        expect(seqSurgeon.reverse('cba')).to.equal('abc');
        expect(seqSurgeon.reverse('dabc')).to.equal('cbad');
        expect(seqSurgeon.reverse('')).to.equal('');
      });

      it('should reverse symbols in the given sequence array', function(){
        expect(seqSurgeon.reverse(['c','b','a'])).to.eql(['a', 'b', 'c']);
        expect(seqSurgeon.reverse([])).to.eql([]);
      });
    });

    describe('#sortSymbols()', function(){
      it('should sort symbols in the given sequence string', function(){
        expect(seqSurgeon.sortSymbols('cba')).to.equal('abc');
        expect(seqSurgeon.sortSymbols('dabc')).to.equal('abcd');
        expect(seqSurgeon.sortSymbols('')).to.equal('');
      });

      it('should sort symbols in the given sequence array', function(){
        expect(seqSurgeon.sortSymbols(['c','b','a'])).to.eql(['a', 'b', 'c']);
        expect(seqSurgeon.sortSymbols([])).to.eql([]);
      });
    });

    describe('#truncateBack()', function(){
      it('should return original sequence if shorter than maxLength', function(){
        expect(seqSurgeon.truncateBack('cba', 3)).to.equal('cba');
        expect(seqSurgeon.truncateBack('cba', 4)).to.equal('cba');
        expect(seqSurgeon.truncateBack('cb', 2)).to.equal('cb');
        expect(seqSurgeon.truncateBack('', 2)).to.equal('');
      });

      it('should return truncated sequence if shorter than maxLength', function(){
        var moreSymbol = seqSurgeon.moreSymbol();

        expect(seqSurgeon.truncateBack('cbaa', 3)).to.equal('cb'+moreSymbol);
        expect(seqSurgeon.truncateBack('cbaawererw', 4)).to.equal('cba'+moreSymbol);
      });

    });

    describe('#truncateFront()', function(){
      it('should return original sequence if shorter than maxLength', function(){
        expect(seqSurgeon.truncateFront('cba', 3)).to.equal('cba');
        expect(seqSurgeon.truncateFront('cba', 4)).to.equal('cba');
        expect(seqSurgeon.truncateFront('cb', 2)).to.equal('cb');
        expect(seqSurgeon.truncateFront('', 2)).to.equal('');
      });

      it('should return truncated sequence if shorter than maxLength', function(){
        var moreSymbol = seqSurgeon.moreSymbol();

        expect(seqSurgeon.truncateFront('cbaa', 3)).to.equal(moreSymbol+'aa');
        expect(seqSurgeon.truncateFront('cbaawererw', 4)).to.equal(moreSymbol+'erw');
      });

    });

  });
//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});

