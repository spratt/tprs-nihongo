#!/usr/bin/env python3
'''index_kanji.py reads the kanji2dic.yaml and reorganizes it so that
it is a dictionary indexed by the literal character, for easy lookups.

Usage:

    $ cat kanjidic2.yaml | ./index_kanji.py > kanji2dic_indexed.yaml

'''
BREAK_FILE_EVERY = 1000

import json
import sys

from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

if len(sys.argv) < 2:
    print('Please specify file output prefix')
    sys.exit(-1)

file_prefix = sys.argv[1]

print('Reading yaml', file=sys.stderr)
data = load(sys.stdin, Loader=Loader)

print('Indexing', file=sys.stderr)
ob_outputs = [{}]
for i, ob in enumerate(data['kanjidic2']['character']):
    ob_outputs[len(ob_outputs)-1][ob['literal']] = ob
    if i % BREAK_FILE_EVERY == 0:
        ob_outputs.append({})

print('Converting to yaml', file=sys.stderr)
yaml_datums = []
for ob in ob_outputs:
    yaml_datums.append(dump(ob, Dumper=Dumper, allow_unicode=True))

print('Printing yamls', file=sys.stderr)
for i, ob in enumerate(yaml_datums):
    with open(f"{file_prefix}_{i}.yaml", 'w') as yaml_file:
        print(ob, file=yaml_file)

