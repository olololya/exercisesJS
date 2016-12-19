import React, { Component } from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import Icon from './Icon';
import PropContainer from './PropContainer';
import '../stylesheet/detail.scss';

class Detail extends Component {

  onClickFaves = (obj, id) => {
    if (this.props.params.array === 'faves') return;
    if (this.isFaves(obj)) this.props.actionsFaves.deleteItem(id);
    else this.props.actionsFaves.pushItem(obj);
  };

  getElement = () => {
    const { faves } = this.props.favesState;
    const { array, id } = this.props.params;
    const list = (array === 'faves') ? faves : this.props.listState.list;
    const info = list[id];
    return (
      <div className="detail-container">
        <div className="tit">
          <span>{info.updated_in_days_formatted}</span><br />
          <h3>{info.title}</h3>
          <Icon
            elem={info}
            click={this.onClickFaves}
            faves={this.isFaves(info)}
            id={id}
            type="star"
          />
        </div>
        <div className="info">
          <img src={info.img_url} alt="asd" />
          <div>
            <PropContainer classN="price" num={info.price_formatted} />
            <PropContainer classN="floor" num={info.floor} />
            <PropContainer classN="bedroom" num={info.bedroom_number} />
            <PropContainer classN="bathroom" num={info.bathroom_number} />
          </div>
        </div>
        <p>{info.summary}</p>
      </div>
    );
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
