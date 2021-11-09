import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Notestate from './context/notes/NoteState';

function App() {
  return (
    <>
    <Notestate>
      <Router>
        <Navbar />
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        </div>
      </Router>
      </Notestate>

    </>
  );
}

export default App;
