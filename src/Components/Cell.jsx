import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class Cells extends Component {

  click = (event) => {
    this.props.openCell(event.target.id);
  };

  clickContext = (event) => {
    event.preventDefault();
    this.props.setFlag(event.target.id);
  };

  generateCell = () => {
    const { isOpen, isFlag, isBomb, inner } = this.props;
    const classCell = classNames({
      close: !isOpen,
      open: isOpen,
      bomb: isBomb && isOpen,
      flag: isFlag,
      'flag-bomb': isBomb && isFlag && isOpen
    });

    let innerLocal = '';
    if (inner !== 0 && isOpen && !isBomb && !isFlag) innerLocal = inner;

    return (
      <button
        className={classCell}
        onClick={this.click}
        onContextMenu={this.clickContext}
        id={this.props.id}
      >
        {innerLocal}
      </button>
    );
  };

  render() {
    return <td> {this.generateCell()} </td>;
  }
}

Cells.propTypes = {
  id: PropTypes.string,
  inner: PropTypes.number,
  isBomb: PropTypes.bool,
  isFlag: PropTypes.bool,
  isOpen: PropTypes.bool,
  openCell: PropTypes.func,
  setFlag: PropTypes.func
};
