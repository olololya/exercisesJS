import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Cell extends Component {

  static propTypes = {
    idRow: PropTypes.number,
    idCell: PropTypes.number,
    openCell: PropTypes.func,
    getInner: PropTypes.func,
    isBomb: PropTypes.func,
    isFlag: PropTypes.func,
    open: PropTypes.bool,
    setFlag: PropTypes.func };

  constructor(props) {
    super(props);
    const idLocal = `${this.props.idRow} ${this.props.idCell}`;
    this.state = {
      id: idLocal,
      inner: this.props.getInner(idLocal),
      bomb: this.props.isBomb(idLocal),
      flag: this.props.isFlag(idLocal) };
    this.click = this.click.bind(this);
    this.clickContextMenu = this.clickContextMenu.bind(this);
  }

  update() {
    this.setState({
      inner: this.props.getInner(this.state.id),
      bomb: this.props.isBomb(this.state.id),
      flag: this.props.isFlag(this.state.id) });
  }

  click() {
    this.props.openCell(this.state.id);
    this.update();
  }

  clickContextMenu(event) {
    event.preventDefault();
    this.props.setFlag(this.state.id);
    this.update();
  }

  generateCell() {
    const classCell = classNames({
      close: !this.props.open,
      open: this.props.open,
      bomb: this.state.bomb && this.props.open,
      flag: this.state.flag,
      'flag-bomb': this.state.bomb && this.state.flag && this.props.open });

    let inner = '';
    if (this.state.inner !== 0) {
      if (this.props.open && !this.state.bomb && !this.state.flag) {
        inner = this.state.inner;
      }
    }
    return (
      <button
        className={classCell}
        onClick={this.click}
        onContextMenu={this.clickContextMenu}
        id={`${this.props.idRow} ${this.props.idCell}`}
      >
        { inner }
      </button>
    );
  }

  render() {
    return (
      <td>
        { this.generateCell() }
      </td>
    );
  }
}

// Cell.

export default Cell;
