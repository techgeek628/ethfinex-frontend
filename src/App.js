import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import './App.css';
import TabComponent from './components/TabComponent';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Ethfinex Demo</h1>
        </header>
        <Grid>
          <Row>
            <Col md={12}>
              <TabComponent />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
