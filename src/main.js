'use strict';

import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import './stylesheets/main.scss';


import './DragNDrop/dragManager.js';
import StoreDragZone from './DragNDrop/Zone/StoreDragZone.js';
import FormDragZone from './DragNDrop/Zone/FormDragZone.js';
import FormDropTarget from './DragNDrop/Target/FormDropTarget';

let store = document.getElementById('store');
let form = document.getElementById('my-form');

new StoreDragZone(store);
new FormDragZone(form);
new FormDropTarget(form);