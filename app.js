import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
// import { Button } from 'rmwc/Button';
// import '@material/button/dist/mdc.button.css';
import "./app.css";

const test = {
    truc: {
        bidule: "lol"
    }
};

class App extends Component {
    render() {
        return (
            <div>
                {"Test app ohohoh"}
                <div>{test?.truc?.bidule}</div>
                <div>{test?.lol?.bidule === undefined && "Undefined"}</div>
                <div>{test?.lol?.bidule ?? "hihi"}</div>
                <div className="icon icon-test" />
                {/* <Button >Test Button</Button> */}
            </div>
        );
    }
}

App.propTypes = {};

export default hot(module)(App);
