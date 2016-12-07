import React from 'react';
import request from 'request';

import Footer from './Footer';
import Header from './Header';
import MainArea from './MainArea';
import Sidebar from './Sidebar';

export default class Layout extends React.Component {
  constructor () {
    super();

    this.state = {
      spots: {},
      currentSpot: window.localStorage.getItem('userDefaultSpot')
    };


    // hit surf report api then...
    request('http://api.spitcast.com/api/spot/all', (error, response, body) => {
      if (!error && response.statusCode == 200) {

        let formattedSurfSpotData = {};
        let surfSpotData = JSON.parse(body);
        for (var i = 0; i < surfSpotData.length; i++) {
          let spot = surfSpotData[i];
          let countyName = spot.county_name;
          delete spot['county_name'];
          if (formattedSurfSpotData.hasOwnProperty(countyName)) {
            formattedSurfSpotData[countyName].push(spot);
          } else {
            formattedSurfSpotData[countyName] = [];
            formattedSurfSpotData[countyName].push(spot);
          }
        }

        // set spots to the api return data
        this.setState({spots: formattedSurfSpotData});
        console.log(formattedSurfSpotData);
      } else {
        alert('No access to internet connection! Surf Report could not be accessed.');
      }
    });
  }


  render() {
    return (
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <Sidebar spots={this.state.spots} />
            <MainArea spot={this.state.currentSpot} />
          </div>
        </div>
        <Footer currentSpot={this.state.currentSpot} />
      </div>
    );
  }
}
