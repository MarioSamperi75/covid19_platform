import React, { Component } from 'react';

import "./DropDown.css"


/**
 * @alias Dropdown
 * @memberOf Layout
 * @param {Array<string>} props.options -The array string to fill the dropdown
 * @param {function} props.selectedDropdownOption -The connection with the method getOptionFromDropdown(Layout).
 * The methode receives the selected name, uppdate the state selectedDropdownOption and invokes the method createRegionColorObject
 * @return {JSX.Element}
 * @description The class component dropdown returns a dropdown as JSX element,
 * and fills in it the list of array that receives as props.
 * Those items are the dropDown options.
 */
class Dropdown extends Component {


    /**
     * @alias dropdownOnchangeHandler
     * @function
     * @memberOf Dropdown
     * @param {string} option -The name of option selected by the user in the dropdown
     * @returns void
     * @description This method receives the name of the option and use it as argument of the props dropdownOnchangeHandler.
     * That props is created in Layout.js.
     * In Layout.js it invokes the method getOptionFromDropdown and it pass the name of the option as argument.
     */
    dropdownOnchangeHandler = (option) => {
        this.props.selectedDropdownOption(option)
    }

    render() {
        return (
             <>
                <select className="DropDown" onChange={(event) => this.dropdownOnchangeHandler(event.target.value)} title="Filtrera statistik">
                    {this.props.options &&
                    this.props.options.map(o =>
                        <option key={o.text} value={o.text}>
                            {o.text}</option>)
                    }
                </select>
            </>
        )
    }
}
export default Dropdown;