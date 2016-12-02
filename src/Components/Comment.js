import React, { Component } from 'react';
import { Popover, Overlay } from 'react-bootstrap';

class Comment extends Component {

  render() {
    return (
      <Overlay
        target={this.props.target}
        placement="right"
        show={true}
      >
        <Popover id="popover" title="Comment">
          {this.props.comment}
        </Popover>
      </Overlay>
    );
  }
}

export default Comment;