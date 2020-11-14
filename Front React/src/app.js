import React from "react";
import List from "./components/listar";
import Add from "./components/agregar"
import DataTable from './components/test'
import Crud from './components/crud'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
      <Router>
        <Route path="/" exact component={List} />
        <Route path="/add" component={Add} />
        <Route path="/list" component={DataTable} />
        <Route path="/crud" component={Crud} />
      </Router>
  );
}

export default App;
