import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import Actions from '../Actions';

import '../stylesheet/addField.scss';

class AddField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      comment: ''
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }


  handleChangeText(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleChangeComment(event) {
    this.setState({
      comment: event.target.value
    });
  }

  addNewItems() {
    if (this.state.value == '') return;
    Actions.addItem(this.state.value, this.state.comment);
    this.setState({
      value: '',
      comment: ''
    });
  }

  render() {
    return (
      <div className="fieldAdd">
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="What needs to be done?"
          onChange={this.handleChangeText}
          maxLength="40"
          ref='input'
        />
        <Button onClick={this.addNewItems.bind(this)}>Add</Button>
        <textarea
          value={this.state.comment}
          placeholder="Your comment"
          onChange={this.handleChangeComment}
          className="form-control"
          maxLength="100"
        >
        </textarea>
      </div>
    );
  }
}

export default AddField;


