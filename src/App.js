import React, { Component } from 'react';
import './App.css';
import Grid from "./components/Grid";
import Settings from "./components/Settings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useNumbers: true,
      useSpecials: true,
      cellWordLength: 4,
      hasExpiration: false,
      expiration: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(setting) {
    this.setState({
      useNumbers: "useNumbers" in setting ? setting.useNumbers : this.state.useNumbers,
      useSpecials: "useSpecials" in setting ? setting.useSpecials : this.state.useSpecials,
      cellWordLength: "cellWordLength" in setting? setting.cellWordLength : this.state.cellWordLength,
      hasExpiration: "hasExpiration" in setting ? setting.hasExpiration : this.state.hasExpiration,
      expiration: "expiration" in setting ? new Date(setting.expiration) : this.state.expiration
    });
    
  }

  render() {
    return (
      <div className="App">
        <Grid 
          useNumbers={this.state.useNumbers}
          useSpecials={this.state.useSpecials}
          cellWordLength={this.state.cellWordLength}
          hasExpiration={this.state.hasExpiration}
          expiration={this.state.expiration}
        />
        <Settings
          useNumbers={this.state.useNumbers}
          useSpecials={this.state.useSpecials}
          cellWordLength={this.state.cellWordLength}
          hasExpiration={this.state.hasExpiration}
          handleChange={this.handleChange}
        />
      </div> 
    );
  }
}

export default App;
