import React from "react";

import  "./Toolbar.css"
import  DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

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