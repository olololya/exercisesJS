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

  getResult = (value) => {
    const url = 'http://api.nestoria.co.uk/';
    const request = `${url}api?encoding=json&pretty=1&page=1&action=search_listings&country=uk&listing_type=buy&place_name=${value}`;
    fetch(request)
      .then(resp => resp.json())
      .then(resp => this.props.actionsList.pushItems(resp.response.listings))
      .catch((error) => {
        throw new Error(error);
      });
  };

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
    const { list } = this.props.listState;
    const length = list.length;
    if (length !== 0) {
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
    return null;
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
