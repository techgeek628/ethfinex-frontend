import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';

const API_URL = process.env.REACT_APP_API_URL;

class SellComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tokenSell: { token: '', noOfToken: 0, ETH: '', expires: '' }
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(key, value) {
    if(key === 'token') {
      const { tokens } = this.props;
      const obj = tokens.filter(t => t.name === value);
      this.setState({ ...this.state, tokenSell: { ...this.state.tokenSell, [key]: value, eth: obj.eth } });
    }
    else {
      this.setState({ ...this.state, tokenSell: { ...this.state.tokenSell, [key]: value } });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { tokenSell } = this.state;
    fetch(`${API_URL}/sell`, {
      method: 'post',
      body: JSON.stringify(tokenSell)
     }).then(response => response.json())    
    .then(data => this.setState({ tokens: data.tokens }))
    .catch(error => this.setState({ error }))
  }
 
  render() {

    const { tokenSell } = this.state;
    const { tokens } = this.props;

    const options = tokens.map(token => {
     return {label: token, value: token}
    });

    return(
        <Row>
          <Form onSubmit={this.onSubmit}>                      
            <Col md={12}>
              <FormGroup>
                <ControlLabel>Token</ControlLabel>
                <Select 
                  name="token"
                  value={tokenSell.token}
                  options={options}
                  onChange={selectOpt => this.handleChange('token', selectOpt.value)} />
              </FormGroup>
              </Col>
            <Col md={12}>
              <FormGroup>
                <ControlLabel>No. Of Token</ControlLabel>
                <FormControl type="number" name="noOfToken" placeholder="No of Token" value={tokenSell.noOfToken} onChange={e => this.handleChange(e.target.name, e.target.value) } />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <ControlLabel>ETH</ControlLabel>
                <FormControl name="eth" type="number" placeholder="" readOnly value={tokenSell.eth} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <ControlLabel>Expires</ControlLabel>
                <FormControl type="number" name="expires" placeholder="" value={tokenSell.expires} onChange={e => this.handleChange(e.target.name, e.target.value) } />
              </FormGroup>
            </Col>
            <Col md={12}>
              <Button type="submit">Sell</Button>
            </Col>
          </Form>
        </Row>
      )
    }
  }

export default SellComponent;