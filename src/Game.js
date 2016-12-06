class Game {

  static getInner(id) {
    let num = 0;
    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    for (let n = x - 1; n <= x + 1; n += 1) {
      if (n >= 0 && n < this.state.currDiff.rows) {
        for (let m = y - 1; m <= y + 1; m += 1) {
          if (m >= 0 && m < this.state.currDiff.cols) {
            if (n !== x && m !== y) {
              if (this.isBomb(`${n} ${m}`)) num += 1;
            }
          }
        }
      }
    }
    return num;
  }

  static openCell(id) {
    let clicks = this.state.numClicks;
    const openCellsLocal = this.state.openCells;
    if (clicks === 0) {
      this.generateBomb(id);
      clicks += 1;
      this.state.numClicks = clicks;
    }
    if (this.isOpenCell(id)) return;
    openCellsLocal.push(id);

    this.setState({ openCells: openCellsLocal });

    /* if (!this.getInner(id) && !this.isFlag(id)) {
     this.openNeighboringCells(id);
     }*/
  }

  static isOpenCell(id) {
    if (this.state.openCells.indexOf(id) !== -1) return true;
    return false;
  }

  static isFlag(id) {
    if (this.state.flagCells.indexOf(id) !== -1) return true;
    return false;
  }

  static isBomb(id) {
    if (this.state.bombCells.indexOf(id) !== -1) return true;
    return false;
  }

  static openNeighboringCells(id) {
    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    for (let n = x - 1; n <= x + 1; n += 1) {
      if (n >= 1 && n < this.state.currDiff.rows) {
        for (let m = y - 1; m <= y + 1; m += 1) {
          if (m >= 1 && m < this.state.currDiff.cols) {
            if (n !== x && m !== y) {
              const id2 = `${n} ${m}`;
              if (!this.isOpenCell(id2) && !this.isBomb(id2) && !this.isFlag(id2)) {
                this.openCell(id2);
              }
            }
          }
        }
      }
    }
  }

  static generateBomb(id) {
    function generateChance() {
      const chance = Math.random() * 100;
      if (chance <= 5) return true;
      return false;
    }

    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    let bombs = this.state.currDiff.bombs;
    const bombCells = [];
    while (bombs > 0) {
      for (let i = 0; i < this.state.currDiff.rows; i += 1) {
        if (bombs === 0) break;
        for (let j = 0; j < this.state.currDiff.cols; j += 1) {
          if (i !== x && j !== y) {
            if (generateChance() && !this.isBomb(`${i} ${j}`)) {
              bombCells.push(`${i} ${j}`);
              bombs -= 1;
            }
            if (bombs === 0) break;
          }
        }
      }
    }
    return bombCells;
  }

}

export default Game;
