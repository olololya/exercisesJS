import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import Element from '../Components/Element';

class Faves extends Component {

  onClick = obj => this.props.actionsFaves.deleteItem(this.props.faves.favesList.indexOf(obj));

  getElements = () => {
    const { favesList } = this.props.faves;
    if (favesList.length !== 0) {
      return (
        <div>
          {favesList.map((elem, index) => (
            <Element
              key={elem.id}
              info={elem}
              faves={null}
              click={this.onClick}
              route={this.props.route}
              type={'cross'}
            />
          ))}
        </div>
      );
    }
    return <p>You dont have faves.</p>;
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

const mapStateToProps = state => ({ faves: state.faves });

const mapDispatchToProps = dispatch => ({
  actionsFaves: bindActionCreators(actions.faves, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Faves);
