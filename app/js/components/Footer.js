import React from 'react';

export default class Footer extends React.Component {
  setDefaultSpot (spot) {
    this.props.setDefaultSpot(spot);
  }

  render() {
    return (
      <footer className="toolbar toolbar-footer">
        <div className="toolbar-actions">
          <button className="btn btn-mini btn-default pull-right" onClick={() => {
              if (this.props.currentSpot) {
                this.setDefaultSpot(this.props.currentSpot);
              } else {
                alert('Select a spot first!');
              }
            }}>
            Set Default Spot
          </button>
          <h1 className="title word-wrap">Icon by <a href="http://www.flaticon.com/authors/ocha" title="OCHA" target="_blank">OCHA</a> | Surf Report by <a href="http://www.spitcast.com/" title="Spitcast" target="_blank">Spitcast</a></h1>
        </div>
      </footer>
    );
  }
}
