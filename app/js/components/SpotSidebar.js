import React from 'react';

export default class SpotSidebar extends React.Component {
  constructor () {
    super();
  }

  setCurrentSpot (spot) {
    this.props.setCurrentSpot(spot);
  }

  render() {
    return (
      <div className="pane-sm pane sidebar">
        <ul className="list-group">
        {Object.keys(this.props.county).map((key) => {
            let spot = this.props.county[key];
            return <li key={key} className="list-group-item" onClick={() => { this.setCurrentSpot(spot) }}>{key}</li>;
        })}
        </ul>
      </div>
    );
  }
}
