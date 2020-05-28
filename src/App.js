import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
import Result from "./views/Result";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/result" exact component={Result} />
    </BrowserRouter>
  );
}

export default App;
