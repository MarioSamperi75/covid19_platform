import React from "react";

import "./DrawerToggle.css";

/**
 * @alias DrawerToggle
 * @memberOf Layout
 * @param {function} props.clicked - The connection to the toggleSideDrawerHandler function that changes the boolean state showSideDrawer
 * @return {JSX.Element}
 * @description The functional component DrawerToggle returns the element DrawerToggle,
 * that is the element responsible to open and close the sideDrawer.
 * The onClick properties is connected with Layout through the component SideDrawer
 * and there, it changes the boolean value of the state 'showSideDrawer' by invoking the method toggleSideDrawerHandler.
 */
const drawerToggle = (props) => (
    <div title="Öppna Meny" className="DrawerToggle" onClick={props.clicked}>
        <div />
        <div />
        <div />
    </div>
);

export default drawerToggle;