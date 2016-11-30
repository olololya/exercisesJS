'use strict';

import Component from './Component';
import TextArea from '../Elements/TextArea';
import Label from '../Elements/Label';

export default class TextAreaComponent extends Component {

  constructor(elem, id) {
    let textareaElem = elem.getElementsByTagName('textarea')[0];
    let textareaObj = new TextArea(textareaElem);
    super(id, 'textarea');
    this.id_elem = textareaObj.id;
    this.placeholder = textareaObj.placeholder;
    this.rows = textareaObj.rows;
    this.className = textareaObj.className;

    this.label = new Label(elem.getElementsByTagName('label')[0]).innerHTML;
  }
}
