import React from "react";

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
const dropdown = (props) => {
    return <>
        <select className="DropDown" {...props}>
            {props.options &&
            props.options.map(o =>
                <option key={o.key} value={o.key}>
                    {o.text}</option>)
            }
        </select>
    </>;
}
export default dropdown;