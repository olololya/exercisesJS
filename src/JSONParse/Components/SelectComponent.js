'use strict';

import Component from './Component';
import Select from '../Elements/Select';
import Label from '../Elements/Label';

export default class SelectComponent extends Component {

  constructor(elem, id) {
    let selectElem = elem.getElementsByTagName('select')[0];
    let selectObj = new Select(selectElem);
    super(id, 'select');
    this.id_elem = selectObj.id;
    this.options = selectObj.options;
    this.className = selectObj.className;

    this.label = new Label(elem.getElementsByTagName('label')[0]).innerHTML;
  }
}
