import React from 'react';

export default class Header extends React.Component {
  quitApp () {
    if (confirm("Quit this app?")) {
      ipcRenderer.send("quit-app", "yes");
    }
  }

  render() {
    return (
      <header className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <button className="btn btn-mini btn-default pull-right" onClick={this.quitApp}>
            <span className="icon icon-cancel"></span>
          </button>
          <h1 className="title">Cali Surf Check Menubar</h1>
        </div>
      </header>
    );
  }
}
