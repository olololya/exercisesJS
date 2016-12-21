import React, { Component, PropTypes } from 'react';
import '../stylesheet/paginator.scss';

class Paginator extends Component {

  onClickPageControl = (event) => {
    switch (event.target.innerText) {
      case '<':
        if (this.props.current > 1) this.props.actions.goPrevPage();
        else return;
        break;
      case '>':
        if (this.props.current < this.props.total) this.props.actions.goNextPage();
        else return;
        break;
      case 'Go': {
        const num = parseInt(this.input.value, 10);
        if (!isNaN(num) && num <= this.props.total && num >= 1) {
          this.props.actions.goSpecialPage(num);
        } else return;
        break;
      }
      default: break;
    }
    this.props.getResult();
  };

  onKeyPressedInput = (event) => {
    if (event.key === 'Enter') {
      const num = parseInt(this.input.value, 10);
      if (!isNaN(num) && num <= this.props.total && num >= 1) {
        this.props.actions.goSpecialPage(num);
      } else return;
    } else return;

    this.input.value = '';
    this.props.getResult();
  };

  render() {
    const { current } = this.props;
    let { total } = this.props;
    if (total === 0) total = 1;
    return (
      <div className="paginator">
        <div>
          <button className="pageControl pagePrev" onClick={this.onClickPageControl}>{'<'}</button>
          <span>{`${current} page of ${total}`}</span>
          <button className="pageControl pageNext" onClick={this.onClickPageControl}>{'>'}</button>

          <label htmlFor="input-page">Go to page:</label>
          <input
            type="number"
            id="input-page"
            ref={input => (this.input = input)}
            min={1}
            max={total}
            onKeyPress={this.onKeyPressedInput}
          />
          <button className="pageControl" onClick={this.onClickPageControl}>Go</button>
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number
};

export default Paginator;
