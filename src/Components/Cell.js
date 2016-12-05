import React, { Component } from 'react';

let INNER_CELL = {
  bomb: 'bomb',
  empty: 'empty',
  number: 'number'
};

class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id_row + ' ' + this.props.id_cell,
      open: false,
      inner: null,
      bomb: false,
      flag: false
    };
    this.update = this.update.bind(this);
  }

  update() {
    this.props.openCell(this.state.id);
    this.setState({
      open: true,
      inner: this.props.getInner(this.state.id),
      bomb: this.props.isBomb(this.state.id),
      flag: this.props.isFlag(this.state.id)
    });
  }

  render() {

    let cell = (() => {
      let classCell;
      let inner = '';
      if (this.state.open) {
        classCell = 'open ';
        if (this.state.bomb) {
          if (this.state.flag) classCell += 'flag-bomb';
          else classCell += 'bomb'
        } else {
          if (this.state.inner != 0) inner = this.state.inner;
        }
      } else {
        if (this.state.flag) classCell += 'flag ';
        else classCell = 'close ';

        if (this.state.bomb) classCell += 'bomb';
      }
      return (
        <div className={classCell}>{inner}</div>
      )
    })();

    return (
      <td onClick={this.update}
          id={this.props.id_row + ' ' + this.props.id_cell}>
        {cell}
      </td>
    );
  }
}

export default Cell;