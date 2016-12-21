import React, { Component, PropTypes } from 'react';

class SearchForm extends Component {

  submitButton = (event) => {
    event.preventDefault();
    this.props.submitForm(this.input.value);
  };

  render() {
    return (
      <form className="search-form">
        <input
          type="text"
          placeholder="W6, London"
          ref={input => (this.input = input)}
        />
        <button
          type="submit"
          onClick={this.submitButton}
        >Go!</button><br />
        <span>enter place name for search in UK</span>
      </form>
    );
  }
}

SearchForm.propTypes = { submitForm: PropTypes.func };

export default SearchForm;
