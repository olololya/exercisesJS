'use strict';

import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import './stylesheets/main.scss';

import './DragNDrop/dragManager.js';
import StoreDragZone from './DragNDrop/Zone/StoreDragZone.js';
import FormDragZone from './DragNDrop/Zone/FormDragZone.js';
import FormDropTarget from './DragNDrop/Target/FormDropTarget';
import JSONParser from './JSONParse/JSONParser';

let store = document.getElementById('store');
let form = document.getElementById('my-form');

new StoreDragZone(store);
new FormDragZone(form);
new FormDropTarget(form);


document.getElementById('tojson').onclick = () => {
  let form = document.getElementById('my-form');
  let text = JSONParser.toJSON(form);
  if (text == '[]') {
    alert('Not elements');
  } else {
    let textarea = document.getElementById('textareaJSON');
    textarea.value = text;
  }
};

document.getElementById('fromjson').onclick = () => {
  let form = document.getElementById('your-form');
  clearForm(form);
  let textarea = document.getElementById('textareaJSON');
  let text = textarea.value;
  if (text == '') {
    alert('Not text');
  } else {
    JSONParser.fromJSON(text, form);
  }
};

function clearForm(form) {
  let childs = Array.prototype.slice.call(form.children);
  let i = 0;
  for (let child of childs) {
    if (i === 0) {
      i++;
      continue;
    }
    form.removeChild(child);
  }
}