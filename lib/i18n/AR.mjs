import N2WordsAbs from '../classes/N2WordsAbs.mjs';

export default function() {
  N2WordsAbs.call(this);

  this.integer_value = 0;
  this._decimalValue = 0;
  this.negative_word = 'ناقص';
  this.separator_word = 'فاصلة';
  this.number = 0;
  this.ZERO = 'صفر';
  // this.isCurrencyPartNameFeminine = true
  // this.isCurrencyNameFeminine = false
  this.arabicOnes = [
    '', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية',
    'تسعة',
    'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر',
    'ستة عشر', 'سبعة عشر', 'ثمانية عشر',
    'تسعة عشر',
  ];
  this.arabicFeminineOnes = [
    '', 'إحدى', 'اثنتان', 'ثلاث', 'أربع', 'خمس', 'ست', 'سبع', 'ثمان',
    'تسع',
    'عشر', 'إحدى عشرة', 'اثنتا عشرة', 'ثلاث عشرة', 'أربع عشرة',
    'خمس عشرة', 'ست عشرة', 'سبع عشرة', 'ثماني عشرة',
    'تسع عشرة',
  ];
  this.arabicTens = ['عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
  this.arabicHundreds = ['', 'مائة', 'مئتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
  this.arabicAppendedTwos = ['مئتا', 'ألفا', 'مليونا', 'مليارا', 'تريليونا', 'كوادريليونا', 'كوينتليونا', 'سكستيليونا'];
  this.arabicTwos = ['مئتان', 'ألفان', 'مليونان', 'ملياران', 'تريليونان', 'كوادريليونان', 'كوينتليونان', 'سكستيليونان'];
  this.arabicGroup = ['مائة', 'ألف', 'مليون', 'مليار', 'تريليون', 'كوادريليون', 'كوينتليون', 'سكستيليون'];
  this.arabicAppendedGroup = ['', 'ألفاً', 'مليوناً', 'ملياراً', 'تريليوناً', 'كوادريليوناً', 'كوينتليوناً', 'سكستيليوناً'];
  this.arabicPluralGroups = ['', 'آلاف', 'ملايين', 'مليارات', 'تريليونات', 'كوادريليونات', 'كوينتليونات', 'سكستيليونات'];
  this.digit_feminine_status = (digit/* , groupLevel */) => {
    // if ((groupLevel == -1 && this.isCurrencyPartNameFeminine) || (groupLevel == 0 && this.isCurrencyNameFeminine)) {
    //   return this.arabicFeminineOnes[parseInt(digit)]
    // }
    return this.arabicOnes[parseInt(digit)];
  };
  this.process_arabic_group = (groupNumber, groupLevel, remainingNumber) => {
    let tens = groupNumber % 100;
    const hundreds = groupNumber / 100;
    let retVal = '';
    if (parseInt(hundreds) > 0) {
      retVal = (
        tens == 0 && parseInt(hundreds) == 2
      ) ? this.arabicAppendedTwos[0] : this.arabicHundreds[parseInt(hundreds)];
    }
    if (tens > 0) {
      if (tens < 20) {
        if (tens == 2 && parseInt(hundreds) == 0 && groupLevel > 0) {
          retVal = ([
            2000, 2000000, 2000000000, 2000000000000, 2000000000000000, 2000000000000000000
          ].indexOf(this.integer_value) != -1) ? this.arabicAppendedTwos[
              parseInt(groupLevel)] : this.arabicTwos[parseInt(groupLevel)
            ];
        } else {
          if (retVal != '') {
            retVal += ' و ';
          }
          if (tens == 1 && groupLevel > 0 && hundreds == 0) {
            retVal += '';
          } else if (
            (tens == 1 || tens == 2) && (groupLevel == 0 || groupLevel == -1) &&
            (hundreds == 0 && remainingNumber == 0)
          ) {
            retVal += '';
          } else {
            retVal += this.digit_feminine_status(parseInt(tens), groupLevel);
          }
        }
      } else {
        const ones = tens % 10;
        tens = (tens / 10) - 2;
        if (ones > 0) {
          if (retVal != '' && tens < 4) {
            retVal += ' و ';
          }
          retVal += this.digit_feminine_status(ones, groupLevel);
        }
        if (retVal != '' && ones != 0) {
          retVal += ' و ';
        }
        retVal += this.arabicTens[parseInt(tens)];
      }
    }
    return retVal;
  };

  this.toCardinal = number => {
    if (parseInt(number) == 0) {
      return this.ZERO;
    }
    let tempNumber = number;
    this.integer_value = number;
    let retVal = '';
    let group = 0;
    while (tempNumber > 0) {
      const numberToProcess = parseInt(tempNumber % 1000);
      tempNumber = parseInt(tempNumber / 1000);
      const groupDescription = this.process_arabic_group(numberToProcess, group, Math.floor(tempNumber));
      if (groupDescription != '') {
        if (group > 0) {
          if (retVal != '') {
            retVal = ' و ' + retVal;
          }
          if (numberToProcess != 2) {
            if (numberToProcess % 100 != 1) {
              if (numberToProcess >= 3 && numberToProcess <= 10) {
                retVal = this.arabicPluralGroups[group] + ' ' + retVal;
              } else {
                if (retVal != '') {
                  retVal = this.arabicAppendedGroup[group] + ' ' + retVal;
                } else {
                  retVal = this.arabicGroup[group] + ' ' + retVal;
                }
              }
            } else {
              retVal = this.arabicGroup[group] + ' ' + retVal;
            }
          }
        }
        retVal = groupDescription + ' ' + retVal;
      }
      group += 1;
    }
    return retVal.trim();
  };
}
