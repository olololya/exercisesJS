import React, { Component } from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import Icon from './Icon';
// import Element from './Element';
// import '../stylesheet/detail.scss';

class Detail extends Component {

  onClickFaves = (obj, id) => {
    if (this.isFaves(obj)) this.props.actionsFaves.deleteItem(id);
    else this.props.actionsFaves.pushItem(obj);
  };

  getElement = () => {
    const { faves } = this.props.favesState.faves;
    const { array, id } = this.props.params;
    const list = (array === 'faves') ? faves : this.props.listState.list;
    const info = list[id];
    return (
      <div className="detail-container">
        <div className="tit">
          <h3>{info.title}</h3>
          <Icon
            elem={info}
            click={this.onClickFaves}
            faves={faves}
            id={id}
            type="star"
          />
          <span>{info.updated_in_days_formatted}</span><br />
        </div>
        <img src={list[id].img_url} alt="asd" />
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.getElement()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
