const { Console } = require('@woowacourse/mission-utils');
const { LOTTO_ERROR_MESSAGE, LOTTO_OUTPUT } = require('./constants');

class Lotto {
  #numbers;
  #bonusNumber;
  #purchaseLottoList;

  constructor(numbers, bonusNumber, purchaseLottoList) {
    this.validate(numbers);
    this.validateBonusNumber(numbers, bonusNumber);
    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
    this.#purchaseLottoList = purchaseLottoList;
    this.winngLotto();
  }

  validate(numbers) {
    if (numbers.length !== 6) throw new Error(LOTTO_ERROR_MESSAGE.LENGTH);
    if (new Set(numbers).size !== 6) throw new Error(LOTTO_ERROR_MESSAGE.DUPLICATE);
    const inRangeNumber = numbers.filter(x => x >= 1 && x <= 45).length;
    if (inRangeNumber !== 6) throw new Error(LOTTO_ERROR_MESSAGE.OUT_OF_RANGE);
  }
  
  validateBonusNumber(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) throw new Error(LOTTO_ERROR_MESSAGE.BONUS_DUPLICATE);
  }

  winngLotto() {
    const numberInput = this.#numbers.map(Number)
    let matchNumber = [];
    let matchBonus = false;
    for (let i=0; i<this.#purchaseLottoList.length; i++) {
      matchNumber.push(this.#purchaseLottoList[i].filter(x => numberInput.includes(x)).length);
      if (this.#purchaseLottoList[i].includes(Number(this.#bonusNumber))) matchBonus = true;
    }
    
    this.printLottoResult(matchNumber, matchBonus);
  }
}


module.exports = Lotto;
