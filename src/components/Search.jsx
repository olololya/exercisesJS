import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { searchActions } from '../Actions/actions';

class Search extends Component {

  searchFilm = (event) => {
    event.preventDefault();
    this.props.actionsSearch.searchFilms(this.searchInput.value);
  };

  showResult = () => {
    const { searchResult } = this.props.data;
    return (searchResult.length) ?
      <ul>
        {searchResult.map(elem => (
          <li key={elem.id}>{elem.title}</li>
        ))}
      </ul>
      : <span>No results</span>;
  };

  render() {
    const { isSearch } = this.props.data;
    const flexStyleForm = (isSearch) ? { flexGrow: '0', flexDirection: 'row' } : { flexGrow: '1' };
    const flexStyleResult = (isSearch) ? { flexGrow: '1' } : { flexGrow: '0' };
    return (
      <div className="page">
        <form className="search-form" onSubmit={this.searchFilm} style={flexStyleForm}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter film title"
            ref={input => (this.searchInput = input)}
          />
          <Button onClick={this.searchFilm}>Search</Button>
        </form>
        <div className="search-result" style={flexStyleResult}>
          {isSearch ? this.showResult() : null}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  data: PropTypes.object,
  actionsSearch: PropTypes.object
};

const mapStateToProps = state => ({
  data: state.search
});

const mapDispatchToProps = dispatch => ({
  actionsSearch: bindActionCreators(searchActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
