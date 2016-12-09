import React, { Component, PropTypes } from 'react';

export default class ChoiceDiff extends Component {

  click = (event) => {
    const { login, router, change } = this.props;

    if (login) {
      router.push(`game/${event.target.value}`);
      change(event.target.value);
    } else {
      alert('Your should be log in');
    }
  };

  render() {
    return (
      <div className="difficult">
        <p>Choice difficult:</p>
        <ul>
          <li><button onClick={this.click} value="easy">Easy</button></li>
          <li><button onClick={this.click} value="normal">Normal</button></li>
          <li><button onClick={this.click} value="hard">Hard</button></li>
        </ul>
      </div>
    );
  }
}

ChoiceDiff.propTypes = {
  login: PropTypes.string,
  router: PropTypes.object,
  change: PropTypes.func
};
