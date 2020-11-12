import React from "react";
import List from "./components/listar";
import Add from "./components/agregar"
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
      <Router>
        <Route path="/" exact component={List} />
        <Route path="/add" component={Add} />
      </Router>
  );
}

export default App;
