import React from "react";

import "./DropDown.css"

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