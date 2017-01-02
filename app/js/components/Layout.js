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
      currentCounty: null,
      currentSpot: null,
      currentSpotForcast: null,
      defaultSpotId: window.localStorage.getItem('userDefaultSpot')
    };

    this.loadDefaultSpotReport.bind(this)();
  }

  componentDidMount () {
    ipcRenderer.on("reload-report", () => {
      this.loadDefaultSpotReport.bind(this)();
    });
  }

  loadDefaultSpotReport () {
    this.getSpotData.bind(this)(() => {
      if (this.state.defaultSpotId && this.state.counties) {
        let county = this.state.defaultSpotId.split('$')[0];
        let spot = this.state.defaultSpotId.split('$')[1];
        this.setCurrentSpot.bind(this, this.state.counties[county][spot])();
      }
    });
  }

  getSpotData (callback) {
    // hit surf report api then...
    request('http://api.spitcast.com/api/spot/all', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let formattedSurfSpotData = {};
        let surfSpotData = JSON.parse(body);
        for (var i = 0; i < surfSpotData.length; i++) {
          let spot = surfSpotData[i];
          let countyName = spot.county_name;
          if (formattedSurfSpotData.hasOwnProperty(countyName)) {
            let spotName = spot.spot_name;
            formattedSurfSpotData[countyName][spotName] = spot;
          } else {
            formattedSurfSpotData[countyName] = {};
            let spotName = spot.spot_name;
            formattedSurfSpotData[countyName][spotName] = spot;
          }
        }

        // set spots to the api return data
        this.setState({counties: formattedSurfSpotData});
        callback();
      } else {
        alert('No access to internet connection! Surf Report could not be accessed.');
      }
    });
  }


  setCounty (county) {
    if (county == this.state.currentCounty) {
      this.setState({currentCounty: null})
    } else {
      this.setState({currentCounty: county});
    }
  }

  setCurrentSpot (spot) {
    this.setState({
      currentSpotForcast: null,
      currentCounty: null,
      currentSpot: spot
    });

    getSpotForcast(spot, this);

    function getSpotForcast(spot, self) {
      request('http://api.spitcast.com/api/spot/forecast/' + spot.spot_id, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let spotForcastData = JSON.parse(body);
          getTideData(spot, spotForcastData, self);
        } else {
          alert('Failed to get ' + spot.spot_name + ' report.');
        }
      });
    }

    function getTideData (spot, spotForcastData, self) {
      request('http://api.spitcast.com/api/county/tide/' + spot.county_name.toLowerCase().replace(' ','-'), (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let spotTideData = JSON.parse(body);
          spotForcastData.map(function (forcast, index) {
            forcast["tide"] = spotTideData[index]["tide"];
            return forcast
          })
          self.setState({currentSpotForcast: spotForcastData});
        } else {
          alert('Failed to get ' + spot.county_name + ' tide.');
        }
      });
    }
  }



  setDefaultSpot (spot) {
    window.localStorage.setItem('userDefaultSpot', spot.county_name + '$' + spot.spot_name );
    alert('Successfully saved ' + spot.spot_name + ' as default spot.');
  }

  render() {
    return (
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <CountySidebar counties={this.state.counties} currentCounty={this.state.currentCounty} setCounty={this.setCounty.bind(this)} />
            { this.state.currentCounty &&
              <SpotSidebar county={this.state.currentCounty} setCurrentSpot={this.setCurrentSpot.bind(this)}/>
            }
            <MainArea currentSpot={this.state.currentSpot} defaultSpotId={this.state.userDefaultSpot} spotForcast={this.state.currentSpotForcast}/>
          </div>
        </div>
        <Footer currentSpot={this.state.currentSpot} setDefaultSpot={this.setDefaultSpot.bind(this)} />
      </div>
    );
  }
}
