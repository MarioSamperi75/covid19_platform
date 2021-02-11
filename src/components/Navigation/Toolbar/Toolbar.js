import React from "react";

import  "./Toolbar.css"
import  DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"
import ThemeToggle from "../../Theme/ThemeToggle";
import "../../Theme/Themes.css";

/**
 * @alias Toolbar
 * @memberOf Layout
 * @param props
 * @return {JSX.Element}
 * @description The functional component Toolbar return the header of the page.
 * It contains the DrawerToggle, Logo and the NavigationItem ThemeToggle.
 */
const toolbar = (props) => {

    /**
     * @alias toolbarThemeClass
     * @memberOf Layout
     * @type {string}
     * @description This variable is the name of the css classes that the header element is conneted with.
     * The css class "lightTheme" updates the css to a light-themed version of the application.
     * The css class "darkTheme"  updates the css to a dark-themed version of the application.
     */
    let toolbarThemeClass = null;
    if (!props.isDarkTheme) {
        toolbarThemeClass = "lightTheme Toolbar"}
    else {
        toolbarThemeClass= "darkTheme Toolbar"
    }

    return (
        <header className = {toolbarThemeClass}>
            <DrawerToggle clicked={props.toggleSideDrawer}/>
            <div>
                <img src={"images/logo.png"} draggable={false} title={"Logo design by nan_curinar"} alt="Logo"/>
            </div>

            <nav >
                <ThemeToggle clicked={props.toggleTheme}/>
            </nav>
        </header>
    );
}

export default toolbar;