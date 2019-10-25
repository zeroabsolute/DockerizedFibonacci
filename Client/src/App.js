import React from 'react';
import Axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seenIndexes: [],
      values: [],
      index: '',
    };
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const response = await Axios.get('/api/values/current');
    
    if (response && response.data && Array.isArray(response.data)) {
      this.setState({ values: response.data });
    }
  }
  
  async fetchIndexes() {
    const response = await Axios.get('/api/values/all');
    this.setState({ seenIndexes: response.data || [] });
  }

  async handleSubmit(e) {
    e.preventDefault();

    await Axios.post('/api/values', {
      index: this.state.index,
    });

    this.setState({ index: '' });
  }

  renderSeenIndexes() {
    return this.state.seenIndexes && Array.isArray(this.state.seenIndexes)
      ? this.state.seenIndexes.map(({ number }) => number).join(',')
      : null;
  }

  renderCalculatedValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <h5 key={key}>
          For index {key} result is {this.state.values[key]}
        </h5>
      );
    }

    return entries;
  }
  
  render() {
    return (
      <div className="app">
        <h1>Dockerized Fibonacci v.7</h1>
        <br /><br />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>Enter your index:</label>
          <input 
            value={this.state.index}
            onChange={(e) => this.setState({ index: e.target.value })}
          />
          <button>Submit</button>
        </form>
        <br />
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        <br />
        <h3>Calculated values:</h3>
        {this.renderCalculatedValues()}
      </div>
    );
  }
}

export default App;
