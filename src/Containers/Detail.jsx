import React, { Component } from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/actions';
import Icon from '../Components/Icon';
import PropContainer from '../Components/PropContainer';
import '../stylesheet/detail.scss';

class Detail extends Component {

  onClickFaves = (obj) => {
    if (this.isFave(obj)) {
      this.props.actionsFaves.deleteItem(this.props.favesState.favesList.indexOf(obj));
    } else this.props.actionsFaves.pushItem(obj);
  };

  getElement = () => {
    const { favesList } = this.props.favesState;
    const { array, id } = this.props.params;
    const list = (array === 'faves') ? favesList : this.props.listState.list;
    const idElem = this.searchElem(parseInt(id, 10), list);
    const info = list[idElem];
    return (
      <div className="detail-container">
        <div className="tit">
          <span>{info.updated_in_days_formatted}</span><br />
          <h3>{info.title}</h3>
          <Icon
            elem={info}
            click={(array === 'faves') ? () => {} : this.onClickFaves}
            isFave={this.isFave(info)}
            id={id}
            type="star"
          />
        </div>
        <div className="info">
          <img src={info.img_url} alt="asd" />
          <div>
            <PropContainer classN="price" price={info.price_formatted} />
            <PropContainer classN="floor" num={info.floor} />
            <PropContainer classN="bedroom" num={info.bedroom_number} />
            <PropContainer classN="bathroom" num={info.bathroom_number} />
          </div>
        </div>
        <p>{info.summary}</p>
      </div>
    );
  };

  searchElem = (idFromParam, list) => {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].id === idFromParam) return i;
    }
    return -1;
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

  render() {
    return (
      <div>
        {this.getElement()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listState: state.list,
  favesState: state.faves
});

const mapDispatchToProps = dispatch => ({
  actionsList: bindActionCreators(actions.list, dispatch),
  actionsFaves: bindActionCreators(actions.faves, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
