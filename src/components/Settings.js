import React from "react";
import "./Settings.css";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.onCellWordLengthChange = this.onCellWordLengthChange.bind(this);
    this.onUseNumbersChange = this.onUseNumbersChange.bind(this);
    this.onUseSpecialsChange = this.onUseSpecialsChange.bind(this);
    this.onExpirationChange = this.onExpirationChange.bind(this);
    this.onHasExpirationChange = this.onHasExpirationChange.bind(this);
  }

  onCellWordLengthChange(e) {
    this.props.handleChange({
      cellWordLength: Number.parseInt(e.target.value, 10)
    });
  }

  onUseNumbersChange(e) {
    this.props.handleChange({
      useNumbers: e.target.checked
    });
  }

  onUseSpecialsChange(e) {
    this.props.handleChange({
      useSpecials: e.target.checked
    });
  }

  onExpirationChange(e) {
    this.props.handleChange({
      expiration: e.target.value
    });
  }

  onHasExpirationChange(e) {
    this.props.handleChange({
      hasExpiration: e.target.checked
    });
  }

  render() {
    return(
      <form className="settings-form">
        <p><label>
          Password characters per letter:
          <input 
            type="number" 
            min="2" 
            max="8" 
            step="1" 
            value={this.props.cellWordLength} 
            onChange={this.onCellWordLengthChange}
          />
        </label></p>
        <p><label>
          Include numbers in the password
          <input 
            type="checkbox" 
            checked={this.props.useNumbers} 
            onChange={this.onUseNumbersChange}
          />
        </label></p>
        <p><label>
          Include special characters in the password
          <input 
            type="checkbox" 
            checked={this.props.useSpecials}
            onChange={this.onUseSpecialsChange} 
          />
        </label></p>
        { /* TODO: custom date picker */ }
        <p><label>
          Include expiration date
          <input
            type="checkbox"
            checked={this.props.hasExpiration}
            onChange={this.onHasExpirationChange}
          />
          { this.props.hasExpiration &&   
            <input
              type="date"
              onChange={this.onExpirationChange}
            />
          }
        </label></p>
      </form>
    )
  }
}
