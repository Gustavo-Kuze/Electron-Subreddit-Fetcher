import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const Menu = electron.remote.Menu

class App extends Component {
  state = {
    posts: []
  }

  componentWillMount() {
    this.initMenu()
  }

  componentDidMount() {

    axios.get('https://www.reddit.com/r/aww.json?raw_json=1')
      .then(data => {
        this.setState({
          posts: data.data.data.children
        })
      })
  }

  showImage = img => {
    ipcRenderer.send('toggle-image', img)
  }

  initMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: "Start",
        submenu: [
          {
            type: "separator"
          },
          {
            label: "Exit",
            accelerator: "CmdOrCtrl+E",
            role: 'close'
          }
        ]
      },
      {
        label: "More",
        submenu: [
          {
            label: "About",
            accelerator: "CmdOrCtrl+,",
            click: () => {
              ipcRenderer.send("toggle-about")
            }
          }
        ]
      }
    ])
    Menu.setApplicationMenu(menu)
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          {this.state.posts.map(post =>
            <li key={post.data.id} className="list-group-item flex-container"
              onClick={() => this.showImage(post.data.preview.images[0].source.url)}
            >
              <img src={post.data.thumbnail} className="thumbnail" alt={`Thumbnail of post ${post.data.title}`} />
              <div>
                {post.data.title}
              </div>
            </li>
          )}

        </ul>
      </div>
    );
  }
}

export default App;
