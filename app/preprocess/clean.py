import csv, sys

def clean(input, output):
	rf = open(input, 'r')
	rdr = csv.reader(rf, delimiter='\t', quoting=csv.QUOTE_NONE)
	wf = open(output, 'w')
	wtr = csv.writer(wf, delimiter='\t', doublequote=False, escapechar='\\', quoting=csv.QUOTE_MINIMAL)
	for row in rdr:
		wtr.writerow([row[1], row[0], row[2]])
	rf.close()
	wf.close()


if __name__ == "__main__":
   clean(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "output.tsv")