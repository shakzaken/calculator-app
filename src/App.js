import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Calculator from './components/calculator/calculator';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Calculator />
        <Footer />
      </div>
    );
  }
}

export default App;
