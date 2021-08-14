/* eslint-disable import/max-dependencies */
import n2wordsAR from './i18n/AR.js';
import n2wordsCZ from './i18n/CZ.js';
import n2wordsDE from './i18n/DE.js';
import n2wordsDK from './i18n/DK.js';
import n2wordsEN from './i18n/EN.js';
import n2wordsES from './i18n/ES.js';
import n2wordsFA from './i18n/FA.js';
import n2wordsFR from './i18n/FR.js';
import n2wordsHE from './i18n/HE.js';
import n2wordsHU from './i18n/HU.js';
import n2wordsIT from './i18n/IT.js';
import n2wordsKO from './i18n/KO.js';
import n2wordsLT from './i18n/LT.js';
import n2wordsLV from './i18n/LV.js';
import n2wordsNL from './i18n/NL.js';
import n2wordsNO from './i18n/NO.js';
import n2wordsPL from './i18n/PL.js';
import n2wordsPT from './i18n/PT.js';
import n2wordsRU from './i18n/RU.js';
import n2wordsSR from './i18n/SR.js';
import n2wordsTR from './i18n/TR.js';
import n2wordsUK from './i18n/UK.js';
import n2wordsZH from './i18n/ZH.js';

const supportedLanguages = [
  'en',
  'fr',
  'es',
  'de',
  'pt',
  'it',
  'tr',
  'ru',
  'cz',
  'no',
  'dk',
  'pl',
  'uk',
  'lt',
  'lv',
  'ar',
  'he',
  'ko',
  'nl',
  'sr',
  'fa',
  'zh',
  'hu',
];

/**
 * Converts numbers to their written form.
 *
 * @param {number} n - The number to convert
 * @param {object} [options={lang: "en"}] - Language
 * @returns {string} - Resulting text value.
 */
export default function(n, options) {
  let lang = 'EN'; // default language

  if (options) {
    if (options.lang) {
      // lang is given in options
      if (supportedLanguages.indexOf(options.lang) !== -1)
        lang = options.lang.toUpperCase();
      else
        throw Error(
          'ERROR: Unsupported language. Supported languages are: ' +
            supportedLanguages.sort().join(', ')
        );
    }
  }

  if (lang === 'EN') {
    return n2wordsEN(n);
  } else if (lang === 'FR') {
    return n2wordsFR(n);
  } else if (lang === 'ES') {
    return n2wordsES(n);
  } else if (lang === 'DE') {
    return n2wordsDE(n);
  } else if (lang === 'PT') {
    return n2wordsPT(n);
  } else if (lang === 'IT') {
    return n2wordsIT(n);
  } else if (lang === 'TR') {
    return n2wordsTR(n, options);
  } else if (lang === 'RU') {
    return n2wordsRU(n);
  } else if (lang === 'CZ') {
    return n2wordsCZ(n);
  } else if (lang === 'NO') {
    return n2wordsNO(n);
  } else if (lang === 'DK') {
    return n2wordsDK(n);
  } else if (lang === 'PL') {
    return n2wordsPL(n);
  } else if (lang === 'UK') {
    return n2wordsUK(n);
  } else if (lang === 'LT') {
    return n2wordsLT(n);
  } else if (lang === 'LV') {
    return n2wordsLV(n);
  } else if (lang === 'AR') {
    return n2wordsAR(n);
  } else if (lang === 'HE') {
    // only for numbers <= 9999
    return n2wordsHE(n);
  } else if (lang === 'HU') {
    return n2wordsHU(n);
  } else if (lang === 'KO') {
    return n2wordsKO(n);
  } else if (lang === 'NL') {
    return n2wordsNL(n, options);
  } else if (lang === 'SR') {
    return n2wordsSR(n);
  } else if (lang === 'FA') {
    return n2wordsFA(n);
  } else if (lang === 'ZH') {
    return n2wordsZH(n);
  }
}
