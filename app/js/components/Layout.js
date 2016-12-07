import React from 'react';
import request from 'request';

import Footer from './Footer';
import Header from './Header';
import MainArea from './MainArea';
import CountySidebar from './CountySidebar';
import SpotSidebar from './SpotSidebar';

export default class Layout extends React.Component {
  constructor () {
    super();

    this.state = {
      counties: {},
      currentCounty: '',
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
        this.setState({counties: formattedSurfSpotData});
        console.log(formattedSurfSpotData);
      } else {
        alert('No access to internet connection! Surf Report could not be accessed.');
      }
    });

  }

  setCounty (county) {
    if (county == this.state.currentCounty) {
      this.setState({currentCounty: ""})
    } else {
      this.setState({currentCounty: county});
    }
  }

  render() {
    return (
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <CountySidebar counties={this.state.counties} currentCounty={this.state.currentCounty} setCounty={this.setCounty.bind(this)} />
            { this.state.currentCounty &&
              <SpotSidebar county={this.state.currentCounty} />
            }
            <MainArea spot={this.state.currentSpot} />
          </div>
        </div>
        <Footer currentSpot={this.state.currentSpot} />
      </div>
    );
  }
}
