import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import SearchForm from '../Components/SearchForm';
import Element from '../Components/Element';
import Paginator from '../Components/Paginator';
import '../stylesheet/search.scss';

class Search extends Component {

  componentWillMount = () => {
    this.setState({ placeName: '' });
    this.props.actionsPages.resetPage();
    this.props.actionsList.reset();
  };

  onClickFaves = (obj) => {
    if (this.isFave(obj)) {
      this.props.actionsFaves.deleteItem(this.props.favesState.favesList.indexOf(obj));
    } else this.props.actionsFaves.pushItem(obj);
  };

  getResult = (location) => {
    const fetch = () => this.props.actionsList.fetchItems(this.state.placeName,
      this.props.pagesState.currentPage);
    setTimeout(() => {
      if (location) {
        this.props.actionsPages.resetPage();
        this.setState({ placeName: location }, fetch);
      } else fetch();
    }, 4);
  };

  isFave = (obj) => {
    const { favesList } = this.props.favesState;
    const keysObj = Object.keys(obj);
    let flag;
    for (let i = 0; i < favesList.length; i += 1) {
      const keysObjFaves = Object.keys(favesList[i]);
      flag = true;
      for (let j = 0; j < keysObj.length; j += 1) {
        const key = keysObj[j];
        if (key !== 'id') {
          if (obj[key] !== favesList[i][key]) flag = false;
        }
      }
      if (flag) return true;
    }
    return false;
  };

  showResult = () => {
    const { list, isFound } = this.props.listState;
    const { currentPage, totalPages } = this.props.pagesState;
    if (isFound) {
      return (
        <div>
          <Paginator
            current={currentPage}
            total={totalPages}
            actions={this.props.actionsPages}
            getResult={this.getResult}
          />
          {list.map((elem, index) => (
            <Element
              key={elem.id}
              info={elem}
              isFave={this.isFave(elem)}
              click={this.onClickFaves}
              route={this.props.route}
              type={'star'}
            />
          ))}
          <Paginator
            current={currentPage}
            total={totalPages}
            actions={this.props.actionsPages}
            getResult={this.getResult}
          />
        </div>
      );
    }

    let message = '';
    if (isFound === null) message = 'Error in request';
    else if (isFound !== undefined) message = 'No results';
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
  listState: state.list,
  favesState: state.faves,
  pagesState: state.page
});

const mapDispatchToProps = dispatch => ({
  actionsList: bindActionCreators(actions.list, dispatch),
  actionsFaves: bindActionCreators(actions.faves, dispatch),
  actionsPages: bindActionCreators(actions.page, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
