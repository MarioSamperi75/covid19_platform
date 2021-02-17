import React from "react";

import  "./Toolbar.css"
import  DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"
import ThemeToggle from "../../Theme/ThemeToggle";
import "../../Theme/Themes.css";

/**
 * @alias Toolbar
 * @memberOf Layout
 * @param {function} props.toggleSideDrawer - To toggle the sideDrawer between open and close
 * @param {function} props.toggleTheme - To toggle the theme between dark and light
 * @param {boolean} props.isDarkTheme - To communicate the state of the theme (dark/light) to the component
 * @return {JSX.Element}
 * @description The functional component Toolbar return the header of the page.
 * It contains the DrawerToggle, Logo and the NavigationItem ThemeToggle.
 */
const toolbar = (props) => {

    /**
     * @alias toolbarThemeClass
     * @memberOf Layout
     * @type {string}
     * @description This variable is the name of the css classes that the header element is connected with.
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
            <div className="logo">
                <img src={"images/logo.png"} draggable={false} title={"Logga designad av nan_curinar"} alt="Logo"/>
            </div>
            <ThemeToggle clicked={props.toggleTheme}/>
        </header>
    );
}

export default toolbar;