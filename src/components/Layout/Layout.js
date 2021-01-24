//Data about population:  https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/-kvartal-3-2020/

//Historik: https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1

import React, { Component, Fragment } from "react";
import axios from 'axios';


import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"
import SvgMap from "../SvgMap/SvgMap";
import Table from "../Table/Table";
import DropDown from "../DropDown/DropDown"

import regionInhabitants from "../../inhabitants_by_region.json"


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
        selectedDropdownOption: 'Infected',
        regionColor: {},
        options : [
            { key: 'key-1', text: 'Infected' },
            { key: 'key-2', text: 'Deceased' },
            { key: 'key-3', text: 'Intensive Care' },
            { key: 'key-4', text: 'Infected X 100000' },
            { key: 'key-5', text: 'Deceased X 100000' },
            { key: 'key-6', text: 'Intensive Care X 100000' },
            { key: 'key-7', text: 'Population' },
        ],
        deceasedToday : 0,

    };


    /**
     * @description ComponentDidMount gets the axios request,  creates two states ( ovidData, covidDataRegion)
     * and invokes the method createRegionColorObject.
     * covidData is the entire objekt that the api returns.
     * covidDataRegion is the sub-array that contains data for all the regions.
     */
    componentDidMount() {
        axios.get("https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1").then((response) => {
            const partOfData = response.data.slice(response.data.length-15, response.data.length-1).filter(item=>item.deceased!==0);

            //extract substring
            partOfData.map((item)=>console.log("updated", item.lastUpdatedAtApify.substring(0,10), "deceased", item.deceased));

            const deceasedOggi= partOfData[partOfData.length-1].deceased
            this.setState({deceasedToday : deceasedOggi})


            //difference between two dates
            const startDate  = '2021-01-01';
            const endDate    = '2021-01-02';
            const diffInMs   = new Date(endDate) - new Date(startDate)
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            console.log("diffInDays", diffInDays);
            console.log("partOfData", partOfData)

            //click to try deceased






        })
        //fetching data and set states
        axios.get("https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true").then((response) => {
            this.setState({covidData: response.data});
            this.setState({covidDataRegion: response.data.infectedByRegion});
            console.log("Axios all: ", response.data);
            console.log("Axios region: ", response.data.infectedByRegion);
            //create color in the map (THEN...)
            this.createRegionColorObject ()
        });
        axios.get("https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true").then((response) => {
            console.log("Axios all: ", response.data);

        });
    }




    /**
     * @alias createRegionColorObject
     * @function
     * @memberOf Layout
     * @param {Object} regionData - A part of the object that comes from the axios request
     * @returns {Object}
     * @description  The method createRegionColorObject is an auxiliary function of componentdidMount.
     * It trasforms the data from an axios request objekt (regionData),
     * to an objekt that contains many key/value one for every region.
     * The key is the name of the region, the value is the green value that determines the color of the region.
     * The method has tre steps: integration - selection - rgb conversion.
     * Each of them is delegated to a new function-
     */
    createRegionColorObject = () => {

        this.integrateData();
        /**
         * @alias covidValues
         * @memberOf Layout
         * @type {Array<number>}
         * @description This constant get an array of number -the data of the selected region- through a map function.
         */
        const covidValues = this.selectCovidSubData();
        /**
         * @alias rgbValues
         * @memberOf Layout
         * @type {Array<number>}
         * @description This constant get an array of number -the RGB Green value for all the regions-
         * by invoking the function createRgbValues and passing as argument the entire axios object.
         */
        const rgbValues = this.createRgbValues(covidValues);
        /**
         * @alias regions
         * @memberOf Layout
         * @type {Array<string>}
         * @description This constant get an array of string -the name of the region- through a map function.
         */
        const regions = this.state.covidDataRegion.map(e => e.region)
        /**
         * @alias regionColor
         * @memberOf Layout
         * @type {Objekt}
         * @description This constant is an object that contains many value/key pairs.
         * The the keys come from Region and the values from RgbValues.
         * The conversion is the result of the functions reduce and Object.assign.
         */
        const regionColor = regions.reduce(
            (accumulator, value, index) => Object.assign(accumulator, {
                // the yellow is the minimum but has greenvalue 255. We need to invert that. 255 - value.
                [value]: (255 - rgbValues[index]),
            }), {}
        );
        this.setState({regionColor: regionColor })
    }

    /**
     * @alias integrateData
     * @function
     * @memberOf Layout
     * @return void
     * @description This method integrates the object DataRegion - a part of the object that comes the axios request -
     * with new keyvalues pairs concerning the all the exixtents value calculated in relation to the population.
     */
    integrateData = () => {
            const updatedDataRegion = this.state.covidDataRegion.map((e) => {
                return {
                    ...e,
                    deathsPer100000: Math.round(e.deathCount*100000/regionInhabitants.[e.region]),
                    infectedPer100000: Math.round(e.infectedCount*100000/regionInhabitants.[e.region]),
                    intensiveCarePer100000: Math.round(e.intensiveCareCount*100000/regionInhabitants.[e.region]),
                    population : regionInhabitants.[e.region]
                };
            });

            this.setState({ covidDataRegion: updatedDataRegion })
    }


    /**
     * @alias selectCovidSubData
     * @function
     * @memberOf Layout
     * @return {Array<number>} arrayColor
     * @description This method create en array values selecting between different sub-object in the region Data.
     * This selection is the response to the user's click on the component Dropdown.
     */
    selectCovidSubData = () => {
        let arrayValues = [];
        let regionData = this.state.covidDataRegion
        if (this.state.selectedDropdownOption === "Intensive Care") {
            arrayValues = regionData.map(e => e.intensiveCareCount);
        }
        else if (this.state.selectedDropdownOption === "Deceased") {
            arrayValues = regionData.map(e => e.deathCount);
        }
        else if (this.state.selectedDropdownOption === "Infected") {
            arrayValues = regionData.map(e => e.infectedCount);
        }
        else if (this.state.selectedDropdownOption === "Intensive Care X 100000") {
            arrayValues = regionData.map(e => e.intensiveCarePer100000);
        }
        else if (this.state.selectedDropdownOption === "Deceased X 100000") {
            arrayValues = regionData.map(e => e.deathsPer100000);
        }
        else if (this.state.selectedDropdownOption === "Infected X 100000") {
            arrayValues = regionData.map(e => e.infectedPer100000);
        }
        else if (this.state.selectedDropdownOption === "Population") {
            arrayValues = regionData.map(e => e.population);
        }

        return arrayValues;
    }

    /**
     * @alias createRgbValues
     * @function
     * @memberOf Layout
     * @return {Array<number>} rgbValues
     * @description This method receive en array values and convert them proportionally in a value between 0 and 255.
     * Max and min? Different max and min? Variable to indicate witch kind of value and if/then? Selection data create the variable?
     * sending variable as second argument when invoking createRgbValues?
     */
    createRgbValues = (covidValues) => {
        //ALGORITHM TO CREATE
        return covidValues;
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
     * @alias getRegionNameFromMap
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
    getRegionNameFromMap  = (region) => {
        this.setState({selectedRegionName : region});

        const regionArray = this.state.covidData.infectedByRegion;
        const selectedObjectArray = regionArray.filter(e => (e.region === region ));
        this.setState({selectedRegionObject : selectedObjectArray[0]});
        console.log("deceasedYesterday: ", this.state.deceasedToday)
        console.log("deceasedToday: ", this.state.covidData.deceased)
        console.log("differenza: ", this.state.covidData.deceased -this.state.deceasedToday)
        console.log("deceasedToday: ", this.state.covidData.deceased)
        console.log("per giorno: ", (this.state.covidData.deceased -this.state.deceasedToday)/3)


    }

    /**
     * @alias getOptionFromDropdown
     * @function
     * @param {string} region - the name of the region clicked by the user
     * @memberOf Layout
     * @return void
     * @description This method get the name of the dropdown option as parameter
     * when the user clicks on an option in the DropDown component.
     * The method load the Data from the CovidAPI and invokes createRegionColorObject
     * that is responsible to change the color of the regions in map.
     */
    getOptionFromDropdown  = (option) => {
        this.setState({selectedDropdownOption : option});
        axios.get("https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true")
            .then((response) => {
            this.createRegionColorObject (response.data.infectedByRegion)
        });
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
                        <DropDown options={this.state.options} selectedDropdownOption = {this.getOptionFromDropdown}></DropDown>
                        <SvgMap regionColor ={this.state.regionColor} sendRegion = {this.getRegionNameFromMap} />
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
