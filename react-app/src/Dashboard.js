import React from "react";
import logo from './logo.svg';
import Location from "./Navigation";

const Dashboard = () => {

    const handleClick = () => {
        try {
            // Some code that may throw an error
            var a = 10 / 0;
        } catch (error) {
            // logger.error('An error occurred:', error);
            console.log('An error occurred:', error);
        }
    };

    const logoutClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('isloggedin');
        window.location.href = "/dashboard";
        alert("User session is logout");
    }

    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
            </header>
            <section>
                {/* <button onClick={handleClick}>Log using logger</button> */}
                <div>
                    <button onClick={logoutClick}>logout user</button>
                </div>
                <div>
                    <Location />
                </div>
            </section>
        </div>
    )
}

export default Dashboard;