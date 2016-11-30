'use strict';

import Component from './Component';
import TextInput from '../Elements/TextInput';
import Label from '../Elements/Label';

export default class InputComponent extends Component {

  constructor(elem, id) {
    let inputElem = elem.getElementsByTagName('input')[0];
    let inputObj = new TextInput(inputElem);
    super(id, 'text');
    this.id_elem = inputObj.id;
    this.placeholder = inputObj.placeholder;
    this.className = inputObj.className;

    this.label = new Label(elem.getElementsByTagName('label')[0]).innerHTML;
  }
}
