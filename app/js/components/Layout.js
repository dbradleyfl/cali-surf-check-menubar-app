import React from 'react';
import request from 'request';

export default class Layout extends React.Component {
  constructor () {
    super();

    this.state = {
      counties: [],
      spots: [],
      userSpotId: window.localStorage.getItem('userSpotId')
    };


    // hit surf report api then...
    request('http://api.spitcast.com/api/spot/all', (error, response, body) => {
      if (!error && response.statusCode == 200) {

        // set spots to the api return data
        this.setState({spots: JSON.parse(body)});

        // grab all counties from spots
        let counties = this.state.spots.reduce(function(a, b) {
          if (!a.includes(b.county_name)) {
            a.push(b.county_name);
            return a
          } else {
            return a
          }
        }, []);

        // sort counties and set state
        counties.sort(function(a, b){
          if(a < b) return -1;
          if(a > b) return 1;
          return 0;
        })
        this.setState({counties});
      }
    });
  }


  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Cali Surf Check Menubar</h1>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-mini pane sidebar">
              <ul className="list-group">
                {this.state.counties.map((county, index) => (
                  <li key={index} className="list-group-item">{county}</li>
                ))}
              </ul>
            </div>
            <div className="pane">

            </div>
          </div>
        </div>
        <footer className="toolbar toolbar-footer">
        <div className="toolbar-actions">
          <button className="btn btn-default pull-right">
            Set Default Spot
          </button>
        </div>
        </footer>
      </div>
    );
  }
}
