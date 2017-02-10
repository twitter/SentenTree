import xml.etree.ElementTree as ET
from nltk.tokenize import sent_tokenize
import csv

def jig2tsv(jigFile, tsvFile):
	tree = ET.parse(jigFile)
	root = tree.getroot()
	wf = open(tsvFile, 'w')
	wtr = csv.writer(wf, delimiter='\t', doublequote=False, escapechar='\\', quoting=csv.QUOTE_MINIMAL)
	for document in root:
		docText = document.find('docText').text.encode('ascii', 'ignore').replace('"','\'').replace('\n', '').lower()
		sentences = sent_tokenize(docText)
		for sentence in sentences:
			if( len(sentence) > 0 ):
				wtr.writerow(['', sentence, '1'])
	wf.close()

if __name__ == "__main__":
	jig2tsv(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "output.tsv")