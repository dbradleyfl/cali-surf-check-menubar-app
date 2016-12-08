import React from 'react';
import request from 'request';


export default class MainArea extends React.Component {
  render() {
    return (
      <div className="pane">

        {!this.props.currentSpot &&
          <div className="padded-vertically-less">
            <h3 className="title text-center">Pick a spot using the menu on left.</h3>
            <p className="text-center">Remember to set a default spot by clicking the button below!</p>
          </div>
        }

        {this.props.currentSpot && !this.props.spotForcast &&
          <div className="padded-more">
            <h3 className="title bold">
              Loading forcast for {this.props.currentSpot.spot_name}...
            </h3>
          </div>
        }

        {this.props.currentSpot && this.props.spotForcast &&
          <div>
            <table className="table-striped">
              <thead>
                <tr className="bold">
                  <th className="text-center">{this.props.currentSpot.spot_name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">{this.props.spotForcast[0].date} - Hourly Forcast</td>
                </tr>
              </tbody>
            </table>
            <table className="table-striped">
              <thead>
                <tr className="bold">
                  <th>Hour</th>
                  <th>Size</th>
                  <th>Quality</th>
                </tr>
              </thead>
              <tbody>
              {this.props.spotForcast.map((hour, i) => {
                return (
                  <tr key={i}>
                    <td>{hour.hour}</td>
                    <td>{hour.size}ft</td>
                    <td>{hour.shape_full}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}
