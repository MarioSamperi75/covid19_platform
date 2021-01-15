//database alla dagar from början : https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1

import React, { Component, Fragment } from "react";
import axios from 'axios';


import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"
import SvgMap from "../SvgMap/SvgMap";
import Table from "../Table/Table";
import DropDown from "../DropDown/DropDown"

class Layout extends Component {

    state = {
        showSideDrawer: false,
        covidData: [],
        covidDataRegion: [],
        selectedRegionName: '',
        selectedRegionObject: null,
        regionColor: {Stockholm: 200, Gotland: 123},
        options : [
            { key: 'key-1', text: 'Infected' },
            { key: 'key-2', text: 'Intensive Care' },
            { key: 'key-3', text: 'Deceased' },
        ]

    };


    componentDidMount() {
        axios.get("https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true").then((response) => {
            this.setState({covidData: response.data});
            this.setState({covidDataRegion: response.data.infectedByRegion})
            console.log("Axios: ", response.data.infectedByRegion);

            const regionColor = this.createRegionColorObject (response.data.infectedByRegion)
            console.log(regionColor);;
            this.setState({regionColor: regionColor })
        });
    }


    createRegionColorObject = (regionData) => {
        //   create object regionColor (key:region value:intensiveCareCount)
        //           I reduce the big axios object in two arrays
        //           I create an object from two arrays

        const arrayRegion = regionData.map(function (e) {
            return e.region
        });

        //methoden create ArrayColors :select from dropdown, ändrar varde genom algoritm och returnerar arrayColor
        const arrayColor = regionData.map(function (e) {
            return e.intensiveCareCount
        });

        const regionColor = arrayRegion.reduce(
            (accumulator, value, index) => Object.assign(accumulator, {
                [value]: arrayColor[index],
            }), {}
        );
        return regionColor;

    }


    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };

        });
    };

    getRegion  = (region) => {
        this.setState({selectedRegionName : region});

        const regionArray = this.state.covidData.infectedByRegion;
        const selectedObjectArray = regionArray.filter(e => (e.region === region ));
        this.setState({selectedRegionObject : selectedObjectArray[0]});
    }



    render() {
        let regionRendered = <div>Select a region</div>
        if (this.state.selectedRegionObject) {
            regionRendered = (
            <div className="table3Div">
            Deceased: {this.state.selectedRegionObject.deathCount}
            <br/>
            Infected: {this.state.selectedRegionObject.infectedCount}
            <br/>
            IntensiveCare: {this.state.selectedRegionObject.intensiveCareCount}
            </div>
            )
        }

        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer showState={this.state.showSideDrawer}/>

                <main>
                    <div className="SvgDiv">
                        <DropDown options={this.state.options}></DropDown>
                        <SvgMap sendRegion = {this.getRegion} regionColor ={this.state.regionColor}/>
                    </div>

                    <div className="TablesDiv">

                        <div className="smallTables">
                            <div className="table2Div">
                                <h3>Sweden</h3>
                                <br/>
                                Deceased: {this.state.covidData.deceased}
                                <br/>
                                Infected: {this.state.covidData.infected}
                                <br/>
                                IntensiveCare: {this.state.covidData.intensiveCare}
                                <br/>
                                <br/>
                                <h3>{this.state.selectedRegionName}</h3>
                            </div>

                            {regionRendered}

                        </div>
                        <Table dataRegion = {this.state.covidDataRegion}/>
                    </div>
                </main>

            </Fragment>
        );
    }
}

export default Layout;
