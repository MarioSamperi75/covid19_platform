//Data about population:  https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/-kvartal-3-2020/

//Historik: https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1

import React, { Component, Fragment } from "react";
import axios from 'axios';

import Modal from "../Modal/Modal"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"
import SvgMap from "../SvgMap/SvgMap";
import Table from "../Table/Table";
import DropDown from "../DropDown/DropDown"

import "../Theme/Themes.css";
import regionInhabitants from "../../inhabitants_by_region.json"


/**
 * The class component Layout is the container of the projekt. All the components and almost all the business logic is here.
 */
class Layout extends Component {

    state = {

        useDarkTheme: true,
        loadingAxios : true,
        showSideDrawer: false,
        lastUpdate: '',
        previousUpdate: '',
        covidDataSweden: [],
        covidDataSwedenPrevious: [],
        covidDataRegion: [],
        covidDataRegionPrevious: [],
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
        ]

    };

    /**
     * @description ComponentDidMount gets the axios request,  creates two states ( CovidDataSweden, covidDataSwedenRegion)
     * and invokes the method createRegionColorObject.
     * covidDataSweden is the entire objekt that the api returns.
     * covidDataSwedenRegion is the sub-array that contains data for all the regions.
     */
    componentDidMount() {
        //const requestActual = "https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true"
        const requestHystory ="https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1"

        axios.get(requestHystory)
            .then((response) => {
            const partOfData = response.data.slice(response.data.length-15, response.data.length).filter(item=>item.deceased!==0);
            //extract substring
            //partOfData.map((item)=>console.log("updated", item.lastUpdatedAtApify.substring(0,10), "deceased", item.deceased));
            const covidDataSwedenPrevious = partOfData[partOfData.length-2];
            const covidDataRegionPrevious = partOfData[partOfData.length-2].infectedByRegion;
            const covidDataSweden = partOfData[partOfData.length-1];
            const covidDataRegion = partOfData[partOfData.length-1].infectedByRegion;

            this.setState({covidDataSwedenPrevious : covidDataSwedenPrevious})
            this.setState({covidDataRegionPrevious : covidDataRegionPrevious})
            this.setState({covidDataSweden: covidDataSweden});
            this.setState({covidDataRegion: covidDataRegion});
            this.setState({lastUpdate: covidDataSweden.lastUpdatedAtApify.substring(0,10)})
            this.setState({previousUpdate: covidDataSwedenPrevious.lastUpdatedAtApify.substring(0,10)})

            this.createRegionColorObject ()

            this.setState({loadingAxios:false})
        })

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
                [value]: rgbValues[index],
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
            //TO BE MORE READABLE
            const dataRegion =  this.state.covidDataRegion;
            const dataRegionPrevious =  this.state.covidDataRegionPrevious;
            const dataSverige = this.state.covidDataSweden;
            const dataSverigePrevious = this.state.covidDataSwedenPrevious;

            //CALCULTE DIFFERENCE BETWEEN THE LAST TWO UPDATING DATES (HOW MANY DAYS?)
            const startDate  = this.state.previousUpdate;
            const endDate    = this.state.lastUpdate;
            const diffInMs   = new Date(endDate) - new Date(startDate)
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);


            // REGIONS INTEGRATION
            const updatedDataRegion = dataRegion.map((e, index) => {
                const newDeaths = Math.round(e.deathCount - dataRegionPrevious[index].deathCount)/diffInDays;
                const newInfected = Math.round(e.infectedCount - dataRegionPrevious[index].infectedCount)/diffInDays;
                const newIntensiveCare = Math.round(e.intensiveCareCount - dataRegionPrevious[index].intensiveCareCount)/diffInDays;
                return {
                    ...e,
                    deathsPer100000: Math.round(e.deathCount*100000/regionInhabitants.[e.region]),
                    infectedPer100000: Math.round(e.infectedCount*100000/regionInhabitants.[e.region]),
                    intensiveCarePer100000: Math.round(e.intensiveCareCount*100000/regionInhabitants.[e.region]),
                    population : regionInhabitants.[e.region],
                    newDeaths : newDeaths,
                    newInfected : newInfected,
                    newIntensiveCare : newIntensiveCare
                };
            });


            //SWEDEN INTEGRATION
            const dailyDeaths = ((dataSverige.deceased - dataSverigePrevious.deceased)/diffInDays).toFixed(0);
            const dailyInfected = ((dataSverige.infected - dataSverigePrevious.infected)/diffInDays).toFixed(0);
            const dailyIntensiveCare = ((dataSverige.intensiveCare - dataSverigePrevious.intensiveCare)/diffInDays).toFixed(0);
            const deathsPerMilion = Math.round(dataSverige.deceased*1000000/regionInhabitants.Total);
            const infectedPerMilion = Math.round(dataSverige.infected*1000000/regionInhabitants.Total);
            const intensiveCarePerMilion = Math.round(dataSverige.intensiveCare*1000000/regionInhabitants.Total);

            const updatedDataSweden = { ...dataSverige,
                deathsPerMilion : deathsPerMilion,
                infectedPerMilion : infectedPerMilion,
                intensiveCarePerMilion : intensiveCarePerMilion,
                dailyDeaths : dailyDeaths,
                dailyInfected : dailyInfected,
                dailyIntensiveCare : dailyIntensiveCare,
            }

            //SETTING STATES
            this.setState({covidDataSweden: updatedDataSweden})
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
        let option = this.state.selectedDropdownOption;

        switch(option) {
            case "Infected":
                arrayValues = regionData.map(e => e.infectedCount);
                break;
            case "Deceased":
                arrayValues = regionData.map(e => e.deathCount);
                break;
            case "Intensive Care":
                arrayValues = regionData.map(e => e.intensiveCareCount);
                break;
            case "Infected X 100000":
                arrayValues = regionData.map(e => e.infectedPer100000);
                break;
            case "Deceased X 100000":
                arrayValues = regionData.map(e => e.deathsPer100000);
                break;
            case "Intensive Care X 100000":
                arrayValues = regionData.map(e => e.intensiveCarePer100000);
                break;
            case "Population":
                arrayValues = regionData.map(e => e.population);
                break;
            default:
                arrayValues = regionData.map(e => e.intensiveCareCount);
        }
        return arrayValues;
    }

    /**
     * @alias createRgbValues
     * @function
     * @memberOf Layout
     * @return {Array<number>} rgbValues
     * @description This method receive en array values and convert them proportionally in a value between 0 and 255.
     * The pair of max and min values determine the limit beyond which the color becomes red and yellow, respectively.
     * Max and min values are different depending on the selected option in the dropdown component.
     */
    createRgbValues = (covidValues) => {
        let option= this.state.selectedDropdownOption;
        let max = null;
        let min = null;
        let delta = null;


        switch(option) {
            case "Infected":
                max = 60000;
                min = 10000;
            break;
            case "Deceased":
                max = 2000;
                min = 200;
                break;
            case "Intensive Care":
                max = 1000;
                min = 100;
                break;
            case "Infected X 100000":
                max = 8000;
                min = 1000;
                break;
            case "Deceased X 100000":
                max = 200;
                min = 50;
                break;
            case "Intensive Care X 100000":
                max = 70;
                min = 10;
                break;
            case "Population":
                max = 1000000;
                min = 100000;
                break;
            default:
                max = 1000000;
                min = 100000;
        }

        delta = max - min;
        const rgbValues = covidValues.map(e => Math.round(255-(e*255/delta)));
        return rgbValues;
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

        const regionArray = this.state.covidDataRegion;
        const selectedObjectArray = regionArray.filter(e => (e.region === region ));
        this.setState({selectedRegionObject : selectedObjectArray[0]});
        //TEST
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
        console.log("COVIDDATASWEDEN: ", this.state.covidDataSweden)
    }

    /**
     * @alias toggleThemeHandler
     * @function
     * @memberOf Layout
     * @return void
     * @description This method inverts the boolean value of the state useDarkTheme,
     * as response to the user's click on the component ThemeToggle.
     * ThemeToggle is a child of the components Toolbar and SideDrawer.
     */
    toggleThemeHandler = () => {
        this.setState((prevState) => {
            return {
                useDarkTheme: !prevState.useDarkTheme,
            };
        });
    };

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
            <h3>{this.state.selectedRegionName}</h3>
            Deceased: {this.state.selectedRegionObject.deathCount}
            <br/>
            DeceasedX100000: {this.state.selectedRegionObject.deathsPer100000}
            <br/>
            Daily increase: {this.state.selectedRegionObject.newDeaths}
            <br/><br/>
            Infected: {this.state.selectedRegionObject.infectedCount}
            <br/>
            InfectedX100000: {this.state.selectedRegionObject.infectedPer100000}
            <br/>
            Daily increase: {this.state.selectedRegionObject.newInfected}
            <br/><br/>
            IntensiveCare: {this.state.selectedRegionObject.intensiveCareCount}
            <br/>
            IntensiveCareX100000: {this.state.selectedRegionObject.intensiveCarePer100000}
            <br/>
            Daily increase: {this.state.selectedRegionObject.newIntensiveCare}
            <br/>
            </div>

            )
        }

        /**
         * @alias layoutThemeClass
         * @memberOf Layout
         * @type {string}
         * @description This variable is the name of the css class that the main element is conneted with.
         * The css class "lightTheme" updates the css to a light-themed version of the application.
         * The css class "darkTheme"  updates the css to a dark-themed version of the application.
         */
        let layoutThemeClass = null;
        if (!this.state.useDarkTheme) {
            layoutThemeClass = "lightTheme"}
        else {
            layoutThemeClass= "darkTheme"
        }

        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} toggleTheme={this.toggleThemeHandler} isDarkTheme = {this.state.useDarkTheme}/>
                <SideDrawer showState={this.state.showSideDrawer} toggleTheme={this.toggleThemeHandler} isDarkTheme = {this.state.useDarkTheme}/>
                <Modal show = {this.state.loadingAxios}>
                    <h2>Loading...</h2>
                    <img src={"images/loading.svg"} style={{marginTop : '-15%'}} alt={"loading"} draggable={false}/>
                </Modal>

                <main className={layoutThemeClass}>
                    <div className="SvgDiv">
                        <DropDown options={this.state.options} selectedDropdownOption = {this.getOptionFromDropdown}></DropDown>
                        <SvgMap regionColor ={this.state.regionColor} sendRegion = {this.getRegionNameFromMap} />
                    </div>

                    <div className="TablesDiv">

                        <div className="smallTables">
                            <div className="table2Div">
                                <h3>Sweden</h3>
                                Deceased: {this.state.covidDataSweden.deceased}
                                <br/>
                                Deceased(X M): {this.state.covidDataSweden.deathsPerMilion}
                                <br/>
                                Daily increase: {this.state.covidDataSweden.dailyDeaths}
                                <br/><br/>
                                Infected: {this.state.covidDataSweden.infected}
                                <br/>
                                Infected(X M): {this.state.covidDataSweden.infectedPerMilion}
                                <br/>
                                Daily increase: {this.state.covidDataSweden.dailyInfected}
                                <br/><br/>
                                IntensiveCare: {this.state.covidDataSweden.intensiveCare}
                                <br/>
                                IntensiveCare(X M): {this.state.covidDataSweden.intensiveCarePerMilion}
                                <br/>
                                Daily increase: {this.state.covidDataSweden.dailyIntensiveCare}
                                <br/>
                                <br/>
                            </div>

                            {regionRendered}

                        </div>
                        <Table dataRegion = {this.state.covidDataRegion} lastUpdate = {this.state.lastUpdate}/>
                    </div>
                </main>

            </Fragment>
        );
    }
}

export default Layout;
