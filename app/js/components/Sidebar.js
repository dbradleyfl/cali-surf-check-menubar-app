import React from 'react';

export default class Sidebar extends React.Component {
  constructor () {
    super();

    this.state = {
      countyClicked: ""
    }
  }

  render() {
    return (
      <div className="pane-mini pane sidebar">
        <ul className="list-group">
          {Object.keys(this.props.spots).map((key) => {
            let spot = this.props.spots[key];
            let spotName = key;
            return <li key={spotName} className="list-group-item">{spotName}</li>
          })}
        </ul>
      </div>
    );
  }
}
