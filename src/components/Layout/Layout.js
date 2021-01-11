//database alla dagar from början : https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1

import React, { Component, Fragment } from "react";
import axios from 'axios';


import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"
import SvgMap from "../SvgMap/SvgMap";
import Table from "../Table/Table";

class Layout extends Component {

    state = {
        showSideDrawer: false,
        dummyData :
            [
                { id: 1, name: 'Mario', age: 25, email: 'Mario@email.com' },
                { id: 2, name: 'Marcus', age: 22, email: 'Marcus@email.com' },
                { id: 3, name: 'Mahmoud', age: 30, email: 'Mahmoud@email.com' },
                { id: 4, name: 'Sigrun', age: 29, email: 'Sigrun@email.com' },
                { id: 5, name: 'Sofia', age: 4, email: 'Sofia@email.com' }
            ],
        covidData: [],
        selectedRegion: 'Sverige'

    };


    componentDidMount() {
        axios.get("https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true").then((response) => {
            this.setState({ covidData: response.data });
            console.log(response);
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }


    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };

        });
    };

    getRegion  = (region) => {
        this.setState({selectedRegion : region});
    }



    render() {
        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer showState={this.state.showSideDrawer}/>

                <main>
                    <div className="SvgDiv">
                        <SvgMap sendRegion = {this.getRegion}/>

                    </div>

                    <div className="TableDiv">
                        <Table dummyData = {this.state.dummyData}/>
                        <br/>
                        Selected: {this.state.selectedRegion}
                        <br/>
                        Deceased: {this.state.covidData.deceased}
                        <br/>
                        Infected: {this.state.covidData.infected}
                        <br/>
                        IntensiveCare: {this.state.covidData.intensiveCare}
                    </div>





                </main>

            </Fragment>
        );
    }
}

export default Layout;
