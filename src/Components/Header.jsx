import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {

  getLogin = () => {
    if (this.props.user) {
      return (
        <div>
          <span>User: <b>{this.props.user}</b></span>
          <button className="login-btn" onClick={this.click}>Log out</button>
        </div>
      );
    }
    return <Link to="/login"><button className="login-btn">Login</button></Link>;
  };

  click = () => {
    this.props.logOut();
    this.props.router.push('/');
  };

  render() {
    return (
      <div className="header">
        <div className="login-container">
          {this.getLogin()}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  logOut: PropTypes.func,
  router: PropTypes.object
};

export default Header;
