/* eslint-disable import/max-dependencies */
import test from 'ava';
import n2words from '../lib/n2words.js';
import AR from './i18n/AR.js';
/*import CZ from './i18n/CZ.js';
import DE from './i18n/DE.js';
import DK from './i18n/DK.js';
import EN from './i18n/EN.js';
import ES from './i18n/ES.js';
import FA from './i18n/FA.js';
import FR from './i18n/FR.js';
import HE from './i18n/HE.js';
import HU from './i18n/HU.js';
import IT from './i18n/IT.js';
import KO from './i18n/KO.js';
import LT from './i18n/LT.js';
import LV from './i18n/LV.js';
import NL from './i18n/NL.js';
import NO from './i18n/NO.js';
import PL from './i18n/PL.js';
import PT from './i18n/PT.js';
import RU from './i18n/RU.js';
import SR from './i18n/SR.js';
import TR from './i18n/TR.js';
import UK from './i18n/UK.js';
import ZH from './i18n/ZH.js';*/

const i18n = {
  ar: AR,
  /*cz: CZ,
  de: DE,
  dk: DK,
  en: EN,
  es: ES,
  fa: FA,
  fr: FR,
  he: HE,
  hu: HU,
  it: IT,
  ko: KO,
  lt: LT,
  lv: LV,
  nl: NL,
  no: NO,
  pl: PL,
  pt: PT,
  ru: RU,
  sr: SR,
  tr: TR,
  uk: UK,
  zh: ZH,*/
};

Object.keys(i18n).forEach(language => {
  test(language, t => {
    i18n[language].forEach(problem => {
      t.is(
        n2words(problem[0], Object.assign({ lang: language }, problem[2])),
        problem[1]
      );
    });
  });
});

test('should set English as default language', t => {
  t.is(n2words(12), 'twelve');
  t.is(n2words(356), 'three hundred and fifty-six');
});

test('should throw an error for unsupported languages', t => {
  t.throws(
    () => {
      n2words(2, { lang: 'aaa' });
    },
    { instanceOf: Error }
  );
});
