import bisect, csv, json, nltk, sys, time

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

stopwords = nltk.corpus.stopwords.words('english') + ['rt', 'via', 'amp', 'http', 'https']


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

 
class Corpus(object):
	def __init__(self, dbfile, colText, colCnt, min_support = .01):
		timer = Timer()
 
		self.min_support = min_support

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
		f.close()
		timer.printElapsed()


	def growSets(self):
		timer = Timer()

		groups = []
		nodes = []
		links = {} #adjacency list
		texts = self.texts

		#init sets
		g0 = {'seq':[], 'newItemPos':None, 'size':self.dbSize, 'DBs': [ {'text':t[0], 'count':t[1], 'seqIndices':[]} for t in texts ] }
		groups.append(g0)

		#growSets
		while groups:
			g = groups.pop()
			#print 'grow: ' + str(g['seq']) + ' ' + str(g['size'])

			pos = -1
			word = None
			cnt = 0
			for s in range(len(g['seq']) + 1):
				#print "s = " + str(s);
				fdist = nltk.probability.FreqDist()
				for t in g['DBs']:
					if s == 0:
						l = 0
					else:
						l = t['seqIndices'][s-1] + 1
					if s == len(g['seq']):
						r = len(t['text'])
					else:
						r = t['seqIndices'][s]
					for w in t['text'][l:r]:
						fdist.inc(w, t['count'])
					#print self.printSeq(t['text'][l:r])
				if fdist.N() > 0 and fdist[ fdist.max() ] > cnt:
					pos = s
					word = fdist.max()
					cnt = fdist[word]

			if not self._checkMinSupport(cnt): #could not find new item with enough support, discard branch
				continue
			#print str(pos) + " : " + self.itemset[word] + " : " + str(cnt)

			if cnt == g['DBs'][0]['count']:
				#take the entirety of the top tweet
				t = g['DBs'][0]
				tnodes = []
				for i in range(0, len(t['text'])):
					try:
						j = t['seqIndices'].index(i)
						tnodes.append(g['seq'][j])
					except ValueError:
						newWord = {'entity':self.itemset[t['text'][i]], 'freq':cnt, 'id':len(nodes)}
						nodes.append(newWord)
						tnodes.append(newWord)
				for l in range(0, len(t['text'])-1):
					if not l in t['seqIndices'] or not (l+1) in t['seqIndices']:
						if not tnodes[l]['id'] in links:
							links[ tnodes[l]['id'] ] = {}
						links[ tnodes[l]['id'] ][ tnodes[l+1]['id'] ] = cnt
				for l in range(0, len(t['seqIndices'])-1):
					if t['seqIndices'][l+1] - t['seqIndices'][l] > 1:
						links[tnodes[t['seqIndices'][l]]['id']][tnodes[t['seqIndices'][l+1]]['id']] -= cnt

				if self._checkMinSupport(g['size']-cnt):
					g0 = {'seq': g['seq'], 'newItemPos':None, 'size': g['size']-cnt, 'DBs': g['DBs'][1:]}
					self._insertIntoSortedList(groups, g0)
			else:
				g0 = {'seq': g['seq'], 'newItemPos':None, 'size': g['size']-cnt, 'DBs': []}
				#add new node
				newWord = {'entity':self.itemset[word], 'freq':cnt, 'id':len(nodes)} 
				nodes.append(newWord)
				newseq = list(g['seq'])
				newseq.insert(pos, newWord)			
				g1 = {'seq': newseq, 'newItemPos': pos, 'size':cnt, 'DBs': []}
				#add new links
				if pos <= 0:
					if g['seq']:
						links[newWord['id']] = {g['seq'][0]['id']:cnt}
				elif pos >= len(g['seq']):
					if not g['seq'][-1]['id'] in links:
						links[g['seq'][-1]['id']] = {}
					links[g['seq'][-1]['id']][newWord['id']] = cnt
				else:
					links[g['seq'][pos-1]['id']][g['seq'][pos]['id']] -= cnt #?
					links[g['seq'][pos-1]['id']][newWord['id']] = cnt
					links[newWord['id']]={g['seq'][pos]['id']:cnt}

				for t in g['DBs']:
					if pos == 0:
						l = 0
					else:
						l = t['seqIndices'][pos-1] + 1
					if pos == len(g['seq']):
						r = len(t['text'])
					else:
						r = t['seqIndices'][pos]
					try:
						i = l + t['text'][l:l+r].index(word)
						t['seqIndices'].insert(pos, i)
						g1['DBs'].append(t)
					except ValueError:
						g0['DBs'].append(t)
				#print 'g0: ' + str(g0['seq']) + ' ' + str(g0['newItemPos']) + ' ' + str(g0['size']) + ' DBs: ' + str(g0['DBs'][:3])
				#print 'g1: ' + str(g1['seq']) + ' ' + str(g1['newItemPos']) + ' ' + str(g1['size']) + ' DBs: ' + str(g1['DBs'][:3])

				self._insertIntoSortedList(groups, g1)
				if self._checkMinSupport( g0['size'] ):
					self._insertIntoSortedList(groups, g0)


			# for g in groups:
			# 	 print '    ' + self.printSeq(g['seq']) + ' ' + str(g['size'])

		self.nodes = nodes
		self.links = []
		for l in links.keys():
			for r in links[l].keys():
				self.links.append({'source':l, 'target':r, 'freq':links[l][r]})
		results = {'entities':self.nodes, 'links':self.links}
		f = open('growPhraseResults.json', 'w')
		f.write((json.dumps(results, ensure_ascii=False)))
		f.close()

		timer.printElapsed()


	def _checkMinSupport(self, cnt):
		if not hasattr(self, 'dbSize'):
			raise NameError("dbSize is not defined.")
		if not hasattr(self, 'min_support'):
			raise NameError("min_support is not defined.")
		if cnt >= self.dbSize * self.min_support:
			return True
		else:
			return False


	def printSeq(self, s):
		return ' '.join([self.itemset[i] for i in s])

	def _insertIntoSortedList(self, sortedlist, item):
		i = bisect.bisect_left([l['size'] for l in sortedlist], item['size'])
		sortedlist.insert(i, item)
		return sortedlist


def main(argv):
	c = Corpus('../data/raw/goal1.tsv', 1, 2)
	c.growSets()

if __name__ == "__main__":
   main(sys.argv[1:])