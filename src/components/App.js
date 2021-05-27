import React, { Component } from 'react'
import Web3 from 'web3'
import Identicon from 'identicon.js'
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main

          // Code
            />
          }
        }
      </div>
    );
  }
}

export default App;
