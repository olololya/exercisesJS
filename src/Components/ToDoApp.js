import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import ListStore from '../ListStore';

import ListItem from './ListItem';
import AddField from './AddField';

class ToDoApp extends Component {
  constructor() {
    super();
    this.state = {
      items: ListStore.getItems()
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() { ListStore.addChangeListener(this.onChange); }
  componentWillUnmount() { ListStore.removeChangeListener(this.onChange); }

  onChange() {
    this.setState({
      items: ListStore.getItems()
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={5} mdOffset={4}>
            <AddField />
            {this.state.items.map((item, index) =>
              <ListItem item={item} key={index} />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ToDoApp;