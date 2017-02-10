import csv, json, nltk, sys, time 

#tweet token patterns
tokenPattern = r'''(?x)  # set flag to allow verbose regexps
	 http://t\.co/\w+   # urls
	|http://t\.co\w+    # urls
	|http://t\.\w+      # urls
	|http://\w+         # urls
	| \@\w+             # Twitter handles
	| \#\w+             # hashtags
	| \d+(,\d+)+        # digits with internal commas
	| \w+(-\w+)*        # words with optional internal hyphens
	| \$?\d+(\.\d+)?%?  # currency and percentages, e.g. $12.40, 82%
	| ([A-Z]\.)+        # abbreviations, e.g. U.S.A
'''

stopwords = nltk.corpus.stopwords.words('english') + ['rt', 'via', 'amp', 'http', 'https'] + ['world', 'cup']


class Timer(object):
	def __init__(self):
		self.s = time.time()
		self.e = None
		self.elapsed = None

	def start(self):
		self.s = time.time()

	def end(self):
		self.e = time.time()
		if self.s:
			self.elapsed = self.e - self.s

	def printElapsed(self):
		self.end()
		if self.elapsed:
			print "Elapsed time = " + str(self.elapsed) + " sec."



class FDist(object):
	def __init__(self):
		self.hashtable = {}

	def add(self, item, n = 1):
		h = self.hashtable
		if item in h:
			h[item] += n
		else:
			h[item] = n

	def freq(self, item):
		h = self.hashtable
		if item in h:
			return h[item]
		else:
			return 0

	def items(self):
		h = self.hashtable
		items = sorted(h.keys(), key = lambda i: h[i], reverse = True)
		return items



class HashTable(object):
	def __init__(self):
		self.hashtable = {}

	def add(self, key, value):
		h = self.hashtable
		if key in h:
			h[key].append(value)
		else:
			h[key] = [value]

	def remove(self, key, value):
		h = self.hashtable
		if key in h and value in h[key]:
			h[key].remove(value)
		if len(h[key]) == 0:
			del h[key]

	def replace(self, key, values):
		if len(values) > 0:
			self.hashtable[key] = values
		elif key in self.hashtable:
			del self.hashtable[key]

	def pop(self, key):
		h = self.hashtable
		r = None
		if key in h:
			r = h[key]
			del h[key]
		return r

	def get(self, key):
		h = self.hashtable
		if key in h and len(h[key]) > 0:
			return h[key]
		else:
			return None

	def getAll(self):
		return self.hashtable

	def displayAll(self):
		ks = sorted(self.hashtable.keys(), reverse = True)
		for k in ks:
			print str(k) + " > " + str( [ (v.Ids, v.s) for v in self.hashtable[k]] )

 

class CloSeq(object):
	def __init__(self, s, Ids, p = None):
		self.s = s
		self.Ids = Ids
		self.children = None
		if p:
			self.parents = set([p])
			if p.children:
				p.children.add(self)
			else:
				p.children = set([self])
		else:
			self.parents = None

	def addParent(self, p):
		if self.parents:
			self.parents.add(p)
		else:
			self.parents = set([p])
		if p.children:
			p.children.add(self)
		else:
			p.children = set([self])

	def consumeSeq(self, old):
		if not old.parents:
			raise RuntimeError("Trying to merge the root or a sequence without parents.")
		if self.parents:
			self.parents = self.parents.union(old.parents)
			if old in self.parents:
				self.parents.remove(old)
		else:
			self.parents = old.parents
		for p in old.parents:
			p.children.remove(old)
			p.children.add(self)
		# if old.children:
		# 	print str(self.Ids) + ":" + str(self.s) + " trying to consume " + str(old.Ids)+":"+str(old.s) + " and its children " + str([(c.Ids,c.s) for c in old.children]) 
		# 	if self.children:
		# 		self.children.union(old.children)
		# 	else:
		# 		self.children = old.children
		# 	for c in old.children:
		# 		c.parents.remove(old)
		# 		c.parents.add(self)



class CloSpan(object):
	def closedMining(self, dbfile, colText, colCnt, min_support = .01, ifSaveSeq = False, ifSaveLattice = False):
		timer = Timer()
 
		self.min_support = min_support
		self.dbfile = dbfile

		dbSize = 0
		## load data and tokenize the text
		f = open(dbfile, 'rU')
		rdr = csv.reader(f, delimiter = '\t')
		fdist = nltk.probability.FreqDist()
		for r in rdr:
			text = unicode(r[colText], 'utf-8')
			tokens = nltk.regexp_tokenize(text, tokenPattern)
			if colCnt < 0:
				num = 1
			else:
				num = int(r[colCnt])
			for t in tokens:
				if t not in stopwords:
					fdist.inc(t, num)
			dbSize += num		
		self.dbSize = dbSize
		self.fdist = fdist

		## turn text into itemset numberings				
		itemset = []
		for w in self.fdist.keys():
			if not self._checkMinSupport(self.fdist[w]):
				break
			if w not in stopwords:
				itemset.append(w)
		self.itemset = itemset

		texts = []
		f.seek(0)
		for r in rdr:
			text = unicode(r[colText], 'utf-8')
			tokens = nltk.regexp_tokenize(text, tokenPattern)
			if colCnt < 0:
				num = 1
			else:
				num = int(r[colCnt])
			text = []
			for t in tokens:
				try:
					i = itemset.index(t)
					text.append(i)
				except ValueError:
					pass
			if len(text) > 0:
				texts.append((text, num))
		self.texts = texts

		## Initialize the close sequence lattice and hashtable
		self.lattice = CloSeq([],0)
		self.hash = HashTable()

		## start with 1-item sequences 
		for item in range(0, len(self.itemset)):
			D = [0 for i in range(0, len(self.texts))]
			Ids = self._findSupportDB(D, item)
			self.cloSpan([item], D, Ids, self.lattice)

		f.close()

		## display results
		sid = 0
		phrases = []
		print "Final closed sequences:"
		h = self.hash.getAll()
		ks = sorted(h.keys(), reverse = True)
		for k in ks:
			for v in h[k]:
				if v.parents:
					phrases.append({"entity":self.printSeq(v.s), "freq":k})
					v.id = sid
					sid += 1
				if len(v.s) > 1:
					print str(k) + " " + self.printSeq(v.s)

		if ifSaveSeq:
			f = open('cloSpanSeqs.txt', 'w')
			for k in ks:
				for v in h[k]:
					if len(v.s) > 1:
						f.write( str(k) + " " + self.printSeq(v.s) )
			f.close()
		
		if ifSaveLattice:
			links = []
			tovisit = [self.lattice]
			visited = []
			while len(tovisit) > 0:
				seq = tovisit.pop(0)
				#print (seq.Ids, self.printSeq(seq.s))
				if seq.children:
				#	print '  children: ' + str([ (c.Ids, self.printSeq(c.s)) for c in seq.children])
					for c in seq.children:
						if seq.parents:
							# print str(seq.id) + ": " + self.printSeq(seq.id)
							# print str(c.id) + ": " + self.printSeq(c.s)
							links.append({"source":seq.id, "target":c.id, "freq":c.Ids})
						if not c in visited:
							tovisit.append(c)
				visited.append(seq)
			result = {"entities":phrases, "links":links}
			f = open('clospanresult.json', 'w')
			f.write((json.dumps(result, ensure_ascii=False)))
			f.close()

		timer.printElapsed()

	# def storeSeq2tweet(self):
	# 	h = self.hash.getAll()
	# 	ks = sorted(h.keys(), reverse = True)
	# 	for k in ks:
	# 		for v in h[k]:
	# 			if len(v.s) > 1:
	# 				print str(k) + " > " + self.printSeq(v.s)




	def _printLattice(self):
		print "Lattice:"
		tovisit = [self.lattice]
		visited = []
		while len(tovisit) > 0:
			seq = tovisit.pop(0)
			print (seq.Ids, self.printSeq(seq.s))
			if seq.parents:
				print '  parents:' + str([ (c.Ids, self.printSeq(c.s)) for c in seq.parents])
			if seq.children:
				print '  children: ' + str([ (c.Ids, self.printSeq(c.s)) for c in seq.children])
				for c in seq.children:
					if not c in visited:
						tovisit.append(c)
			visited.append(seq)


	def cloSpan(self, s, Ds, Ids, parent):
		texts = self.texts

		#self._printLattice()
		#print "\ncloSpan: " + str(Ids) + ":" + str(self.printSeq(s))

		## check if s is a sup/sub-sequence of discovered sequences 
		Ldsc = self.hash.pop(Ids)
		Lno = []
		Lsup = []
		Lsub = []
		if Ldsc:
			for dn in Ldsc:
				c = self._checkSeqContainment(dn.s, s)
				if c == 0 or c == 1: # s already discovered or discovered seq contains s
					Lsub.append(dn)
				elif c == -1: # discovered seq is contained in s		
					Lsup.append(dn)
				else: # discovered seq and s do not contain each other
					Lno.append(dn)

		if len(Lsup) > 0 and len(Lsub) > 0:
			raise RuntimeError("Conflicting sequences found in Lattice. Current sequence: " + self.printSeq(s) + ", Lsup: " + str([self.printSeq(o.s) for o in Lsup]) + ", Lsub: " + str([self.printSeq(o.s) for o in Lsub]))

		# add parent to dn's parents, do this for all dn
		if len(Lsub) > 0: 
			for dn in Lsub:
				dn.addParent(parent)
			self.hash.replace(Ids, Ldsc)
			return

		seq = CloSeq(s, Ids, parent)

		# seq takes all of dn's parents 
		if len(Lsup) > 0: 
			for dn in Lsup:
				seq.consumeSeq(dn)

		Lno.append(seq)
		self.hash.replace(Ids, Lno)
		# add s to tree: parent is previous tree node - need to pass in prev tree node
		#print str(Ids) + ' + ' + self.printSeq(s)

		## grow s: scan DB for next freq items and their supports
		fdist = FDist()
		for i in range(0, len(texts)):
			if Ds[i] >= 0 and Ds[i] < len(texts[i][0]):
				fdist.add(texts[i][0][Ds[i]], texts[i][1])

		for a in fdist.items():
			if not self._checkMinSupport(fdist.freq(a)):
				break

			## update suppporting DB
			Dsa = []
			for i in range(0, len(texts)):
				if Ds[i] < 0 or Ds[i] >= len(texts[i][0]) or texts[i][0][Ds[i]] != a:
					Dsa.append(-1)
				else:
					Dsa.append(Ds[i]+1)
			sa = list(s)
			sa.append(a)
			self.cloSpan(sa, Dsa, fdist.freq(a), seq)


	def _checkMinSupport(self, cnt):
		if not hasattr(self, 'dbSize'):
			raise NameError("dbSize is not defined.")
		if not hasattr(self, 'min_support'):
			raise NameError("min_support is not defined.")
		if cnt >= self.dbSize * self.min_support:
			return True
		else:
			return False


	## returns -1: s1 < s2, 0: s1 = s2, 1: s1 > s2, any other value: s1 <> s2
	def _checkSeqContainment(self, s1, s2):
		if len(s1) == len(s2):
			for i in range(0, len(s1)):
				if s1[i] != s2[i]:
					return 2
			return 0
		elif len(s1) < len(s2):
			i1 = 0
			i2 = 0
			while i1 < len(s1) and i2 < len(s2) and len(s1) - i1 <= len(s2) - i2:
				if s1[i1] == s2[i2]:
					i1 += 1
					i2 += 1
				else:
					i2 += 1
			if i1 >= len(s1):
				return -1
			else:
				return 2
		else: # len(s1) > len(s2)
			i1 = 0
			i2 = 0
			while i1 < len(s1) and i2 < len(s2) and len(s1) - i1 >= len(s2) - i2:
				if s1[i1] == s2[i2]:
					i1 += 1
					i2 += 1
				else:
					i1 += 1
			if i2 >= len(s2):
				return 1
			else:
				return 2


	##	Ds is the previous supporting DB, a is the new item in the sequence
	def _findSupportDB(self, Ds, a):
		Ids = 0
		for i in range(0, len(self.texts)):
			if Ds[i] != -1:
				try:
					pos = self.texts[i][0][Ds[i]:].index(a) + Ds[i] + 1
					Ds[i] = pos
					Ids += self.texts[i][1]
				except ValueError:
					Ds[i] = -1
		return Ids


	def printSeq(self, s):
		sp = ''
		for i in s:
			sp += self.itemset[i] + ' '
		return sp


def main(argv):
	c = CloSpan()
	#print float(argv[3]) if len(argv)> 3 else 0.01
	c.closedMining(argv[0], int(argv[1]), int(argv[2]), float(argv[3]) if len(argv)> 3 else 0.01)

if __name__ == "__main__":
   main(sys.argv[1:])