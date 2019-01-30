import React, { Component } from 'react'

export default class About extends Component {

  
  openWebSite = () => {
    window.require("electron").shell.openExternal("https://www.gustavokuze.com")
  }

  render() {
    return (
      <div className="flex-container">
        <p>Criado por <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={this.openWebSite}>Gustavo Kuze</span></p>
      </div>
    )
  }
}
