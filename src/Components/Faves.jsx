import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import Element from './Element';

class Faves extends Component {

  onClick = id => this.props.actionsFaves.deleteItem(id);

  getElements = () => {
    if (this.props.favesState.faves.length !== 0) {
      return this.showResult();
    }
    return <p>You dont have faves.</p>;
  };

  showResult = () => {
    const { faves } = this.props.favesState;
    const length = faves.length;
    if (length !== 0) {
      return (
        <div>
          {faves.map((elem, index) => (
            <Element
              key={index}
              info={elem}
              faves={null}
              click={this.onClick}
              route={this.props.route}
              id={index}
              type={'cross'}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <h2>Your faves</h2>
        <div className="result">
          {this.getElements()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ favesState: state.favesReducer });

const mapDispatchToProps = dispatch => ({
  actionsFaves: bindActionCreators(actions.faves, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Faves);
