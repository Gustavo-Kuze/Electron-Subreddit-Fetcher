import './About.css'
import React, { Component } from 'react'

export default class About extends Component {

  openWebSite = () => {
    window.require("electron").shell.openExternal("https://www.gustavokuze.com")
    // const { remote } = window.require('electron')
    // remote.BrowserWindow.getFocusedWindow().minimize();
  }

  render() {
    return (
      <div className="about-container">
        <p className="about-by">Developed by <span className="about-by-link" onClick={this.openWebSite}>Gustavo Kuze</span></p>
      </div>
    )
  }
}
