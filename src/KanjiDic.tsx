import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';
import * as wanakana from 'wanakana';
import * as _ from 'lodash';

import xhr from './http';

import kanjidic2_00 from './data/kanjidic2_indexed_0.yaml';
import kanjidic2_01 from './data/kanjidic2_indexed_1.yaml';
import kanjidic2_02 from './data/kanjidic2_indexed_2.yaml';
import kanjidic2_03 from './data/kanjidic2_indexed_3.yaml';
import kanjidic2_04 from './data/kanjidic2_indexed_4.yaml';
import kanjidic2_05 from './data/kanjidic2_indexed_5.yaml';
import kanjidic2_06 from './data/kanjidic2_indexed_6.yaml';
import kanjidic2_07 from './data/kanjidic2_indexed_7.yaml';
import kanjidic2_08 from './data/kanjidic2_indexed_8.yaml';
import kanjidic2_09 from './data/kanjidic2_indexed_9.yaml';
import kanjidic2_10 from './data/kanjidic2_indexed_10.yaml';
import kanjidic2_11 from './data/kanjidic2_indexed_11.yaml';
import kanjidic2_12 from './data/kanjidic2_indexed_12.yaml';
import kanjidic2_13 from './data/kanjidic2_indexed_13.yaml';
import kanjidic2_14 from './data/kanjidic2_indexed_14.yaml';
const kanjidic2_files = [
  kanjidic2_00,
  kanjidic2_01,
  kanjidic2_02,
  kanjidic2_03,
  kanjidic2_04,
  kanjidic2_05,
  kanjidic2_06,
  kanjidic2_07,
  kanjidic2_08,
  kanjidic2_09,
  kanjidic2_10,
  kanjidic2_11,
  kanjidic2_12,
  kanjidic2_13,
  kanjidic2_14,
];

export interface TextType {
  text: string;
  typ: string;
}

export interface Codepoint {
  cp_value: TextType[];
}

export interface DicNumber {
  dic_ref: TextType[];
}

export interface Radical {
  rad_value: TextType[];
}

export interface Misc {
  stroke_count: string[];
  variant?: TextType[];
}

export interface ReadingMeaning {
  meaning: string[];
  reading: TextType[];
}

export interface RMGroup {
  rmgroup: ReadingMeaning;
}

export interface DicEntry {
  codepoint: Codepoint;
  dic_number: DicNumber;
  literal: string;
  misc: Misc;
  radical: Radical;
  reading_meaning: RMGroup;
}

const BigSpan = styled.span`
  font-size: 2rem;
`;

export function Kanji(props: {dicEntry: DicEntry}) {
  const readings = _.groupBy(props.dicEntry.reading_meaning.rmgroup.reading, 'typ');
  let best_reading = props.dicEntry.literal;
  if (readings['ja_kun'].length > 0) {
    best_reading = readings['ja_kun'][0].text;
  } else if (readings['ja_on'].length > 0) {
    best_reading = readings['ja_on'][0].text;
  }
  return (
    <BigSpan>
      <ruby>
        { props.dicEntry.literal }
        <rt>{ best_reading }</rt>
      </ruby>
    </BigSpan>
  );
}

export class KanjiDic {
  private data: Record<string, DicEntry> = {};
  
  constructor() {
    kanjidic2_files.forEach((file) => {
      xhr('GET', file).then((req) => {
        const dict = yaml.load(req.response);
        Object.keys(dict).forEach((key: string) => this.data[key] = dict[key]);
      }).catch((err) => console.error(`Error loading ${file}`, err))
    })
  }

  lookup(key: string): DicEntry | undefined {
    return this.data[key];
  }

  renderString(s: string) {
    let dicEntry = this.lookup(s);
    if (dicEntry) {
      return (
        <Kanji dicEntry={dicEntry} />
      );
    }
    return (
      <BigSpan>{ s }</BigSpan>
    );
  }

  makePhrase(s: string) {
    return wanakana.tokenize(s).map((token) => {
      if (wanakana.isKanji(token)) {
        return Array.from(token).map((c) => this.renderString(c));
      }
      return (
        <BigSpan>{ token }</BigSpan>
      );
    }).flat();
  }
}
