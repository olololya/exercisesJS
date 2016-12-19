import React, { Component } from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import SearchForm from './SearchForm';
import Element from './Element';
import '../stylesheet/search.scss';

class Search extends Component {

  onClickFaves = (obj, id) => {
    if (this.isFaves(obj)) this.props.actionsFaves.deleteItem(id);
    else this.props.actionsFaves.pushItem(obj);
  };

  getResult = value => this.props.actionsList.fetchItems(value);

  isFaves = (obj) => {
    const { faves } = this.props.favesState;
    const objJson = JSON.stringify(obj);
    for (let i = 0; i < faves.length; i += 1) {
      const elemJson = JSON.stringify(faves[i]);
      if (elemJson === objJson) return true;
    }
    return false;
  };

  showResult = () => {
    const { list, isFound } = this.props.listState;
    if (isFound) {
      return (
        <div>
          {list.map((elem, index) => (
            <Element
              key={index}
              id={index}
              info={elem}
              faves={this.isFaves(elem)}
              click={this.onClickFaves}
              route={this.props.route}
              router={this.props.router}
              type={'star'}
            />
          ))}
        </div>
      );
    }

    let message = '';
    if (isFound === null) message = 'Error in request';
    else message = 'Not results';
    return (
      <p className="message">
        {message}
      </p>
    );
  };

  render() {
    return (
      <div className="search-container">
        <SearchForm submitForm={this.getResult} />
        <div className="result">
          {this.showResult()}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  listState: state.listReducer,
  favesState: state.favesReducer
});

const mapDispatchToProps = dispatch => ({
  actionsList: bindActionCreators(actions.list, dispatch),
  actionsFaves: bindActionCreators(actions.faves, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
