'use strict';

export default class Checkable {

  constructor(elem) {
    this.options = (function() {
      let arr = [];
      let childs = elem.children;
      for (let i = 0; i < childs.length; i++) {
        if (childs[i].tagName == 'INPUT') {
          arr.push(childs[i + 1].innerHTML);
        }
      }
      return arr;
    })();

    this.type = (function() {
      let elems = elem.getElementsByTagName('input');
      return elems[0].type;
    })();
  }
}