import React, { Component } from 'react';
import Actions from '../Actions';

import Comment from './Comment'
import '../stylesheet/listItem.scss';

class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      isComment: false,
      target: null
    }
  }

  changeStatus() {
    Actions.changeStatusItem(this.props.item);
  }

  changeIsComment(event) {
    let target = event.target;

    if (!target.classList.contains('item-container'))
      target = target.parentNode;

    let status = !this.state.isComment;
    this.setState({
      isComment: status,
      target: target
    });
  }

  deleteItem() {
    Actions.deleteItem(this.props.item);
  }

  render() {
    let classState = 'item-container item-noComplete';
    if (this.props.item.state) {
      classState = 'item-container item-complete';
    }
    let comment;
    if (this.state.isComment && this.props.item.comment != '') {
      comment = <Comment
        comment={this.props.item.comment}
        target={this.state.target}
      />
    }
    return (
      <div className={classState}
           onMouseEnter={this.changeIsComment.bind(this)}
           onMouseLeave={this.changeIsComment.bind(this)}>
        <span className='item-status' onClick={this.changeStatus.bind(this)}>

        </span>
        <span className='item-text'>
          {this.props.item.text}
        </span>
        <span className='delete-item' onClick={this.deleteItem.bind(this)}>
          Delete
        </span>
        {comment}
      </div>
    );
  }
}


export default ListItem;