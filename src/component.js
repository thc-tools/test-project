import React, { Component } from "react";
import PropTypes from "prop-types";

const test = {
    truc: {
        bidule: "lol"
    }
};

class MainComponent extends Component {
    render() {
        return (
            <div>
                {"Test app"}
                <div>{test?.truc?.bidule}</div>
                <div>{test?.lol?.bidule === undefined && "Undefined"}</div>
                <div>{test?.lol?.bidule ?? "hihi"}</div>
                <div className="icon icon-test" />
                {/* <Button >Test Button</Button> */}
            </div>
        );
    }
}

MainComponent.propTypes = {};

export default MainComponent;
