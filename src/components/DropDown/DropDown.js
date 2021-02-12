import React, { Component } from 'react';

import "./DropDown.css"


/**
 * @alias Dropdown
 * @memberOf Layout
 * @param {} props - the dropDown Options (infected, deacesed, intensive Care)
 * @return {JSX.Element}
 * @description The functional component dropdown return a dropdown as JSX element,
 * and fill in it the list of array that receives as props.
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