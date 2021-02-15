//Data about population:  https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/-kvartal-3-2020/

//Historik: https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1

import React, { Component, Fragment } from "react";
import axios from 'axios';

import Modal from "../Modal/Modal"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css"
import SvgMap from "../SvgMap/SvgMap";
import SwedenTable from "../SwedenTable/SwedenTable"
import RegionTable from "../RegionTable/RegionTable"
import Table from "../Table/Table";
import DropDown from "../DropDown/DropDown"
import KeyTable from "../KeyTable/KeyTable"

import "../Theme/Themes.css";
import regionInhabitants from "../../data/inhabitants_by_region.json";


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
        selectedDropdownOption: 'Smittade',
        regionColor: {},
        options : [
            { key: 'key-1', text: 'Smittade' },
            { key: 'key-2', text: 'Smittade per 100000' },
            { key: 'key-3', text: 'Avlidna' },
            { key: 'key-4', text: 'Avlidna per 100000' },
            { key: 'key-5', text: 'IVA' },
            { key: 'key-6', text: 'IVA per 100000' },
            { key: 'key-7', text: 'Befolkning' },
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
            case "Smittade":
                arrayValues = regionData.map(e => e.infectedCount);
                break;
            case "Avlidna":
                arrayValues = regionData.map(e => e.deathCount);
                break;
            case "IVA":
                arrayValues = regionData.map(e => e.intensiveCareCount);
                break;
            case "Smittade per 100000":
                arrayValues = regionData.map(e => e.infectedPer100000);
                break;
            case "Avlidna per 100000":
                arrayValues = regionData.map(e => e.deathsPer100000);
                break;
            case "IVA per 100000":
                arrayValues = regionData.map(e => e.intensiveCarePer100000);
                break;
            case "Befolkning":
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
     * @description This method receives an array values and convert it proportionally in a new array
     * where each value is between 0 and 255.
     * The pair of max and min values determine the limit beyond which the color becomes red and yellow, respectively.
     * Max and min values are different depending on the selected option in the dropdown component.
     */
    createRgbValues = (covidValues) => {
        let option= this.state.selectedDropdownOption;
        let max = null;
        let min = null;
        let delta = null;


        switch(option) {
            case "Smittade":
                max = 50000;
                min = 10000;
            break;
            case "Avlidna":
                max = 2500;
                min = 50;
                break;
            case "IVA":
                max = 1000;
                min = 100;
                break;
            case "Smittade per 100000":
                max = 6000;
                min = 3000;
                break;
            case "Avlidna per 100000":
                max = 250;
                min = 50;
                break;
            case "IVA per 100000":
                max = 70;
                min = 10;
                break;
            case "Befolkning":
                max = 1000000;
                min = 100000;
                break;
            default:
                max = 1000000;
                min = 100000;
        }

        delta = max - min;
        const rgbValues = covidValues.map(e => 255-(Math.round(255*((e-min)/delta))));
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
        let regionRendered = <div>Välj en region</div>
        if (this.state.selectedRegionObject) {
            regionRendered = (
                <RegionTable
                    data = {this.state.selectedRegionObject}
                    option = {this.state.selectedDropdownOption}
                    regionName = {this.state.selectedRegionName}
                    darkTheme = {this.state.useDarkTheme}
                    />
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
                    <h2>Läser in data...</h2>
                    <img src={"images/loading.svg"} style={{marginTop : '-15%'}} alt={"loading"} draggable={false}/>
                </Modal>

                <main className={layoutThemeClass}>
                    <div className="Left" style = {this.state.useDarkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>
                        <DropDown options={this.state.options} selectedDropdownOption = {this.getOptionFromDropdown}></DropDown>
                        <KeyTable/>
                        <SvgMap regionColor ={this.state.regionColor} sendRegion = {this.getRegionNameFromMap} />
                    </div>

                    <div className="Center">
                        <SwedenTable
                            data = {this.state.covidDataSweden}
                            lastUpdate = {this.state.lastUpdate}
                            darkTheme = {this.state.useDarkTheme}
                    />
                        {regionRendered}
                    </div>

                    <div className="Right" style = {this.state.useDarkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>

                        <Table
                            dataRegion = {this.state.covidDataRegion}
                            lastUpdate = {this.state.lastUpdate}
                            darkTheme = {this.state.useDarkTheme}/>
                    </div>
                </main>

            </Fragment>
        );
    }
}

export default Layout;
