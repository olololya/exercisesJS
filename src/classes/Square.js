'use strict';

import Figure from './Figure';

export default class Square extends Figure {

  constructor(id, width_canv, height_canv, color = 'blue', radius = 30, type = 'square') {
    super(id, width_canv, height_canv, color, radius * 2, type);
  }

}