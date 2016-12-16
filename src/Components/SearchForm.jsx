import React, { Component } from 'react';

class SearchForm extends Component {

  componentWillMount = () => {
    this.setState({ value: '' });
  };

  update = (event) => {
    this.setState({ value: event.target.value });
  };

  submitButton = (event) => {
    event.preventDefault();
    this.props.submitForm(this.state.value);
  };

  render() {
    return (
      <form className="search-form">
        <input
          type="text"
          placeholder="place-name"
          onChange={this.update}
        />
        <button
          type="submit"
          onClick={this.submitButton}
        >Go!</button><br />
        <button type="button">
          current country: UK
        </button>
      </form>
    );
  }
}

export default SearchForm;
