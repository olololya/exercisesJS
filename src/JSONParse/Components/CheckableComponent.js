'use strict';

import Component from './Component';
import Checkable from '../Elements/Checkable';
import Label from '../Elements/Label';

export default class SelectComponent extends Component {

  constructor(elem, id) {
    let checkableDiv = elem.getElementsByTagName('div')[0];
    let checkableObj = new Checkable(checkableDiv);
    super(id, checkableObj.type);
    this.id_elem = checkableObj.id;
    this.options = checkableObj.options;

    this.label = new Label(elem.getElementsByTagName('label')[0]).innerHTML;
  }
}
