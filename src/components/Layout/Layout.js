import React, { Component, Fragment } from "react";


import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"

class Layout extends Component {
    state = { showSideDrawer: false,
    covidData: []};
    

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };

        });
    };

    render() {
        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer showState={this.state.showSideDrawer}/>
                <main className="Main">{this.props.children}</main>
            </Fragment>
        );
    }
}

export default Layout;
