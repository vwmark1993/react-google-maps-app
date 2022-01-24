
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, About, Docs, Atlas } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <About />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/docs" exact component={() => <Docs />} />
          <Route path="/atlas" exact component={() => <Atlas />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;