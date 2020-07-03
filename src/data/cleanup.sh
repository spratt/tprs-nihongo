#!/bin/bash
#grep -RiIl "'\#text'" . | xargs sed -i '' -e "s/'\#text'/text/g"
#grep -RiIl "'@var_typ'" . | xargs sed -i '' -e "s/'@var_typ'/typ/g"
grep -RiIl "typ" . | xargs sed -i '' -e "s/typ/typ/g"
