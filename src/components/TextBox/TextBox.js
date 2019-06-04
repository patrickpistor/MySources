import React from "react";
import "./Textbox.style.css";

export class TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: (props.locked && props.active) || false,
      error: props.error || ""
    };
  }

  render() {
    const { active } = this.state;
    const { locked, type, label, onChange, name, value } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"}`;

    return (
      <div className={fieldClassName}>
        <input
          id={1}
          type={type}
          value={value}
          name={name}
          placeholder={label}
          onChange={onChange}
          onFocus={() => this.setState({ active: true })}
          onBlur={() => this.setState({ active: false })}
        />
        <label htmlFor={1}>{label}</label>
      </div>
    );
  }
}
