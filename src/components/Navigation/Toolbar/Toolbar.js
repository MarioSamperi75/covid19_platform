import React from "react";

import  "./Toolbar.css"
import  DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

/**
 * @alias Toolbar
 * @memberOf Layout
 * @param props
 * @return {JSX.Element}
 * @description The functional component Toolbar return the header of the page.
 * It contains the DrawerToggle, Logo and the NavigationItems.
 */
const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.toggleSideDrawer}/>
        <div>
            Logo
        </div>

        <nav >
            NavigationItems
        </nav>
    </header>
);

export default toolbar;