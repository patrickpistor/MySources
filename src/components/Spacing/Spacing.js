import React from "react";

export class Spacing extends React.Component {
  render() {
    const { spacing } = this.props;
    return <div style={{ marginVertical: spacing }} />;
  }
}
