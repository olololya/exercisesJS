import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class Login extends Component {

  constructor() {
    super();
    this.state = { value: 'anonym' };
  }

  update = (event) => {
    this.setState({ value: event.target.value });
  };

  click = () => {
    this.props.actions.setLogin(this.state.value);
    this.props.router.push('/');
  };

  render() {
    return (
      <div className="login">
        <p>Enter your login:</p>
        <p>
          <input
            type="text"
            value={this.state.value}
            onChange={this.update}
          />
        </p>
        <button onClick={this.click}>Enter</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
