import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BuyComponent from './BuyComponent';
import SellComponent from './SellComponent';
import { Row, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

class TabComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1,
      tokens: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/tokens`)
      .then(response => response.json())
      .then(data => this.setState({ tokens: data.tokens }))
      .catch(error => this.setState({ error }))
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {

    const { tokens } = this.state;

    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Buy">
          <Row>
            <Col md={6}>
              <BuyComponent tokens={tokens} />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey={2} title="Sell">
          <Col md={6}>
            <SellComponent tokens={tokens} />
          </Col>
        </Tab>
      </Tabs>
    );
  }
}

export default TabComponent;