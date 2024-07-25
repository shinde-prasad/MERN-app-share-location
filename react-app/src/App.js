import React from "react";
import './App.css';
import HocOfRouteAuth from './HOC';
import Dashboard from './Dashboard';
// import log4js from 'log4js';
// const logger = log4js.getLogger();
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import ReactDOM from 'react-dom/client';
import Clock from './Clock';
import ItemsList from "./ItemsList";
import MyLocation from "./MyLocation";

const ProtectedComponent = HocOfRouteAuth(Dashboard);

function App(props) {
  const listArr = [1, 2, 3, 4];

  return (
    <div className="App">
      <div>
        {/* {props.message} */}
      </div>
      <Routes>
        <Route exact path="/" Component={HocOfRouteAuth(Dashboard)}></Route>
        <Route exact path="/dashboard" Component={HocOfRouteAuth(Dashboard)}></Route>
        <Route path='/login' Component={Login}></Route>
        <Route path='/my-place' Component={HocOfRouteAuth(MyLocation)} />
      </Routes>
      {/* <div>
        <ProtectedComponent />
      </div> */}
      {/* <Clock /> */}
      {/* <ItemsList list={listArr} /> */}
    </div>
  );
}

export default App;
