#!/usr/bin/env python3
'''xml2yaml.py is a quick script to take kanjidic2.xml and turn it
into a yaml file that can be used by tprs-nihongo.

Usage:

    $ cat kanjidic2.xml | ./xml2yaml.py > kanjidic2.yaml

'''
import json
import sys
import xmltodict

from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

print('Reading input', file=sys.stderr)
input_str = ''
for line in sys.stdin:
    input_str += line

print('Parsing xml', file=sys.stderr)
data = xmltodict.parse(input_str)

print('Converting to json', file=sys.stderr)
json_str = json.dumps(data)

print('Converting json to object', file=sys.stderr)
json_data = json.loads(json_str)

print('Converting to yaml', file=sys.stderr)
yaml_data = dump(json_data, Dumper=Dumper, allow_unicode=True)

print('Printing yaml', file=sys.stderr)
print(yaml_data)
