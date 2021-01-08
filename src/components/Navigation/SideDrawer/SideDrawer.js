import React, {Fragment} from "react";

import "./SideDrawer.css"

//insert a backdrop: here or in layout?
const sideDrawer = (props) => {
    let variableClass = null;
    if (props.showState === false) {
        variableClass = "SideDrawer Close"}
    else {
        variableClass= "SideDrawer Open"}



    return (

        <Fragment>
            <div className={variableClass}>
                SideDrawer
                <br/>
                <br/>
                Navigations Items
            </div>

        </Fragment>
    );
};

export default sideDrawer;