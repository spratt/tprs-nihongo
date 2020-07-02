#!/usr/bin/env python3
'''csv2yaml.py is a quick script to take heisig-kanji2.csv and turn
it into a yaml file that can be used by srs-nihongo.

Usage:

    $ cat heisig-kanji2.csv | ./csv2yaml.py > heisig-kanji2.yaml

'''
import csv
import sys

from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

reader = csv.reader(sys.stdin)
data = {'facts':[]}
for line in reader:
    if len(line) < 5 or line[0] == 'String' or line[0] == 'kanji':
        continue
    data['facts'].append({'prompt': line[0], 'number': int(line[3]), 'response': line[4]})
data['facts'].sort(key=lambda x: x['number'])
print(dump(data, Dumper=Dumper, allow_unicode=True))
