#!/usr/bin/env python3
'''index_kanji.py reads the kanji2dic.yaml and reorganizes it so that
it is a dictionary indexed by the literal character, for easy lookups.

Usage:

    $ cat kanjidic2.yaml | ./index_kanji.py > kanji2dic_indexed.yaml

'''
import sys

from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

print('Reading yaml', file=sys.stderr)
data = load(sys.stdin, Loader=Loader)
