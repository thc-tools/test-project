import React, { Component } from "react";
import PropTypes from "prop-types";
import MainComponent from './component';

import "./app.css";

class App extends Component {
    render() {
        return (
            <MainComponent/>
        );
    }
}

App.propTypes = {};

export default App;
