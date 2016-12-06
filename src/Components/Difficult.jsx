import React, { Component, PropTypes } from 'react';

class Difficult extends Component {

  static propTypes = {
    changeDiff: PropTypes.func };

  change = event =>
    this.props.changeDiff(event.target.value);

  render() {
    return (
      <div className="diff-container">
        <p>Difficult:</p>
        <RadioInput value="easy" change={this.change} />
        <RadioInput value="normal" change={this.change} />
        <RadioInput value="hard" change={this.change} />
      </div>
    );
  }
}

export default Difficult;

const RadioInput = props => (
  <div>
    <input
      type="radio"
      id={props.value}
      value={props.value}
      name="difficult"
      checked={props.check}
      onChange={props.change}
    />
    <label htmlFor={props.value}>
      {props.value}
    </label>
  </div>
);
