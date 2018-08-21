import React, { Component } from 'react';
import './footer.css';

export default class footer extends Component {
  render() {
    return (
      <div>
        <hr/>
        <div className="footer">
          <div className="footer-left">
            <a href="http://shakapps.net/">http://shakapps.net/</a>
            <a href="http://shakapps.com/">http://shakapps.come/</a>
          </div>
          <div className="footer-right">
            <p>Made By Yakir Zaken</p>
          </div>
        </div>
      </div>
    )
  }
}
