import React from 'react';

export default class CountySidebar extends React.Component {
  constructor () {
    super();
  }

  setCounty (county) {
    this.props.setCounty(county)
  }

  render() {
    return (
      <div className="pane-mini pane sidebar">
        <ul className="list-group">
          {Object.keys(this.props.counties).map((key) => {
            let county = this.props.counties[key];
            let countyName = key;
            let _className;
            if (county == this.props.currentCounty) {
              _className = "list-group-item active"
            } else {
              _className = "list-group-item"
            }
            return <li key={countyName} className={_className} onClick={() => { this.setCounty(county) }} >{countyName}</li>
          })}
        </ul>
      </div>
    );
  }
}
