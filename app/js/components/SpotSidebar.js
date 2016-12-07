import React from 'react';

export default class SpotSidebar extends React.Component {
  constructor () {
    super();
  }

  render() {
    console.log(this.props.county);
    return (
      <div className="pane-sm pane sidebar">
        <ul className="list-group">
        {this.props.county.map(function(spot, i){
            return <li key={i} className="list-group-item">{spot.spot_name}</li>;
        })}
        </ul>
      </div>
    );
  }
}
