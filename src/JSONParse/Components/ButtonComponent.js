'use strict';

import Component from './Component';
import Button from '../Elements/Button';

export default class InputComponent extends Component {

  constructor(elem, id) {
    let buttonElem = elem.getElementsByTagName('button')[0];
    let buttonObj = new Button(buttonElem);
    super(id, 'button');
    this.id_elem = buttonObj.id;
    this.className = buttonObj.className;
    this.text = buttonObj.text;
  }
}
