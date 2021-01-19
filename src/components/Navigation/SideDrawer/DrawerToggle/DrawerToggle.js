import React from "react";

import "./DrawerToggle.css";

/**
 * @alias DrawerToggle
 * @memberOf Layout
 * @param props
 * @return {JSX.Element}
 * @description The functional component DrawerToggle return the element DrawerToggle,
 * that is the element responsible to open and close the sideDrawer.
 * The onClick properties is connected with Layout through the component SideDrawer
 * and there, it change the boolean value of the state 'showSideDrawer' by invoking the method toggleSideDrawerHandler.
 */
const drawerToggle = (props) => (
    <div className="DrawerToggle" onClick={props.clicked}>
        <div />
        <div />
        <div />
        <div />
    </div>
);

export default drawerToggle;