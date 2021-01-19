//database alla dagar from början : https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1

import React, { Component, Fragment } from "react";
import axios from 'axios';


import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"
import SvgMap from "../SvgMap/SvgMap";
import Table from "../Table/Table";
import DropDown from "../DropDown/DropDown"


/**
 * The class component Layout is the container of the projekt. All the components and almost all the business logic is here.
 */
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


    /**
     * @description ComponentDidMount gets the axios request and creates three states: covidData, covidDataRegion, regionColor.
     * covidData is the entire objekt that the api returns.
     * covidDataRegion is the sub-array that contains data for all the regions.
     * regionColor is the objekt that contains the green values that determines the color of every region.
     * componentDidMount receives this object with the help of the method 'createRegionColorObject'.
     */
    componentDidMount() {
        axios.get("https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true").then((response) => {
            this.setState({covidData: response.data});
            this.setState({covidDataRegion: response.data.infectedByRegion})
            console.log("Axios: ", response.data.infectedByRegion);

            const regionColor = this.createRegionColorObject (response.data.infectedByRegion)
            console.log(regionColor);

            this.setState({regionColor: regionColor })
        });
    }


    /**
     * @alias createRegionColorObject
     * @function
     * @memberOf Layout
     * @param {Object} regionData - A part of the object that comes from the axios request
     * @returns {Object}
     * @description This method trasform the data from an axios request objekt (regionData),
     * to an objekt that contains many key/value. The key is the name of the region,
     * the value is the green value that determines the color of the region.
     * This method is an auxiliary function of componentdidMount.
     */
    createRegionColorObject = (regionData) => {
        /**
         * @alias arrayRegion
         * @memberOf Layout
         * @type {Array<string>}
         * @description This constant get an array of string -the name of the region- through a map function.
         */
        const arrayRegion = regionData.map(e => e.region)
        console.log("arrayRegion:" , arrayRegion);

        //methoden create ArrayColors :select from dropdown, ändrar varde genom algoritm och returnerar arrayColor
        /**
         * @alias arrayColor
         * @memberOf Layout
         * @type {Array<number>}
         * @description This constant get an array of number -the data of the selected region- through a map function.
         */
        const arrayColor = regionData.map(e => e.intensiveCareCount);

        /**
         * @alias regionColor
         * @memberOf Layout
         * @type {Objekt}
         * @description This constant is an object that contains many value/key pairs.
         * The the keys come from arrayRegion and the values from arrayColor.
         * The conversion is the result of the functions reduce and Object.assign.
         */
        const regionColor = arrayRegion.reduce(
            (accumulator, value, index) => Object.assign(accumulator, {
                [value]: arrayColor[index],
            }), {}
        );
        return regionColor;
    }


    /**
     * @alias toggleSideDrawerHandler
     * @function
     * @memberOf Layout
     * @return void
     * @description This method inverts the boolean value of the state showSideSrawer,
     * as response to the user's click on the component DrawerToggle.
     * DrawerToggle is a child of component Toolbar.
     */
    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };

        });
    };

    /**
     * @alias getRegion
     * @function
     * @param {string} region - the name of the region clicked by the user
     * @memberOf Layout
     * @return void
     * @description This method get the name of the region as parameter
     * when the user clicks on a region in the SvgMap.
     * The method creates two state: selectedRegionName and selectedRegionObject.
     * The first is just the name that the method receives (string).
     * The second is the  objekt that contains all the information about the selected region:
     * This object is obteined by filtering an axios requests by the parameter region.
     */
    getRegion  = (region) => {
        this.setState({selectedRegionName : region});

        const regionArray = this.state.covidData.infectedByRegion;
        const selectedObjectArray = regionArray.filter(e => (e.region === region ));
        this.setState({selectedRegionObject : selectedObjectArray[0]});
    }



    render() {
        /**
         * @alias regionRendered
         * @memberOf Layout
         * @type {JSX.Element}
         * @Description The variable regionRendered contains different JSX elements that are rendered conditionally,
         * depending on the value of the state 'selectedRegionName'.
         * The element becomes a table only if it's true (not null),
         * otherwise it remains a text "Select a region".
         * The state 'selectedRegionName' is null when starting the page,
         * and becomes a string (not null, true) when the user clicks on the SvgMap.
         */
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
