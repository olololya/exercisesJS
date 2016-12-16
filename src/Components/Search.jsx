import React, { Component } from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Actions/actions';
import SearchForm from './SearchForm';
import Element from './Element';
import '../stylesheet/search.scss';

class Search extends Component {

  getResult = (value) => {
    const url = 'http://api.nestoria.co.uk/';
    const request = `${url}api?encoding=json&pretty=1&page=1&action=search_listings&country=uk&listing_type=buy&place_name=${value}`;
    fetch(request)
      .then(resp => resp.json())
      .then(resp => this.props.actions.pushItems(resp.response.listings))
      .catch((error) => {
        throw new Error(error);
      });
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
              info={elem}
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
        <div className="search-result">
          {this.showResult()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listState: state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
