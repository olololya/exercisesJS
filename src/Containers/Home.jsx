import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import Header from '../Components/Header';
import ChoiceDiff from '../Components/ChoiceDiff';

class Home extends Component {

  getInner = () => {
    const { children, router } = this.props;
    const { login } = this.props.login;
    const { changeDifficult } = this.props.actions;

    if (children) return <div>{children}</div>;
    return <ChoiceDiff login={login} router={router} change={changeDifficult} />;
  };

  render() {
    const { login } = this.props.login;
    const { delLogin } = this.props.actions;

    return (
      <div className="header">
        <Header user={login} logOut={delLogin} router={this.props.router} />
        {this.getInner()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
