'use strict';

import Text from './Text'

export default class TextArea extends Text {

  constructor(elem) {
    super(elem);
    this.rows = elem.rows || 2;
  }

}