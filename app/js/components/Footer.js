import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="toolbar toolbar-footer">
        <div className="toolbar-actions">
          <button className="btn btn-mini btn-default pull-right">
            Set Default Spot
          </button>
          <h1 className="title word-wrap">Icon by <a href="http://www.flaticon.com/authors/ocha" title="OCHA">OCHA</a> | Surf Report by <a href="http://www.spitcast.com/" title="Spitcast">Spitcast</a></h1>
        </div>
      </footer>
    );
  }
}
