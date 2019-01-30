import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('https://www.reddit.com/r/aww.json')
      .then(data => {
        this.setState({
          posts: data.data.data.children
        })
      })
  }

  showImage = () => {
    ipcRenderer.send('toggle-image')
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          {this.state.posts.map(post =>
            <li key={post.data.id} className="list-group-item flex-container"
              onClick={() => this.showImage()}
            >
              <img  src={post.data.thumbnail} className="thumbnail" alt={`Thumbnail of post ${post.data.title}`}/>
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
