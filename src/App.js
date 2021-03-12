import './App.css';
import React from 'react'
import {
  Route,
  HashRouter
} from "react-router-dom";

import NavBar from './components/Navbar';
import PageHome from './components/PageHome';
import PageNote from './components/PageNote';
import Footer from './components/Footer';

export default function App() {

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <NavBar></NavBar>
        <div className="content">
          <Route exact path="/" component={PageHome}/>
          <Route path="/notes" component={PageNote}/>
        </div>
        <Footer></Footer>
      </div>
    </HashRouter>
  );
}
