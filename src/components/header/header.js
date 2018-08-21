import React, { Component } from 'react'
import './header.css';

export default class header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Calculator</a>
      </nav>
    )
  }
}

