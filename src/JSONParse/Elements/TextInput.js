'use strict';

import Text from './Text'

export default class TextInput extends Text {

  constructor(elem) {
    super(elem);
    this.type = 'text';
  }
}
