import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Cell extends Component {

  static propTypes = {
    id: PropTypes.string,
    openCell: PropTypes.func,
    inner: PropTypes.number,
    bomb: PropTypes.bool,
    flag: PropTypes.bool,
    open: PropTypes.bool,
    setFlag: PropTypes.func };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      inner: this.props.inner,
      bomb: this.props.bomb,
      flag: this.props.flag };
  }

  update() {
    this.setState({
      inner: this.props.inner,
      bomb: this.props.bomb,
      flag: this.props.flag });
  }

  click = () => {
    this.props.openCell(this.state.id);
    this.update();
  };

  clickContextMenu = (event) => {
    event.preventDefault();
    this.props.setFlag(this.state.id);
    this.update();
  };

  generateCell() {
    const classCell = classNames({
      close: !this.props.open,
      open: this.props.open,
      bomb: this.props.bomb && this.props.open,
      flag: this.props.flag,
      'flag-bomb': this.props.bomb && this.props.flag && this.props.open });

    let inner = '';
    if (this.props.inner !== 0) {
      if (this.props.open && !this.props.bomb && !this.props.flag) {
        inner = this.props.inner;
      }
    }
    return (
      <button
        className={classCell}
        onClick={this.click}
        onContextMenu={this.clickContextMenu}
        id={this.props.id}
      >
        {inner}
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

export default Cell;
