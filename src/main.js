'use strict';

import './reset.css';
import './game.css';
import Model from './Model/GameModel.js';
import Controller from './Controller/GameController.js';
import WindowView from './View/WindowView.js';

(function() {
  let model = new Model(10, 10, 10);
  let views = new Array(3);
  for (let i = 0; i < views.length; i++)
    views[i] = new WindowView(model);
  let controller = new Controller(model, views);

  controller.init();
})();



