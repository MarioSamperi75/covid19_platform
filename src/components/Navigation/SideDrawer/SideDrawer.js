import React, {Fragment} from "react";

import "./SideDrawer.css"
import ThemeToggle from "../../Theme/ThemeToggle";
import "../../Theme/Themes.css";

//insert a backdrop: here or in layout?

/**
 * @alias SideDrawer
 * @memberOf Layout
 * @param {boolean} props.showState - communicate the state of the SideDrawer (open/close) to the component
 * @param {function} props.toggleTheme - To toggle the theme between dark and light
 * @param {boolean} props.isDarkTheme - To communicate the state of the theme (dark/light) to the component
 * @return {JSX.Element}
 * @description The functional component Sidedrawer returns a div element
 * that disappears/appears when the user clicks on the drawerToggle element.
 */
const sideDrawer = (props) => {

    /**
     * @alias variableClass
     * @memberOf Layout
     * @type {string}
     * @description This variable is the name of the css class that sideDrawer is connected with.
     * The css class "Close" translates the sideDrawer out of the screen with an animation.
     * The css class "Open" move it in the original position (0,0) with another animation.
     */
    let variableClass = null;
    if (props.showState === false) {
        variableClass = "SideDrawer Close"}
    else {
        variableClass= "SideDrawer Open"}


    if (!props.isDarkTheme) {
        variableClass = variableClass + " lightTheme";
    }
    else {
        variableClass = variableClass + " darkTheme";
    }

    return (

        <Fragment>
            <div className={variableClass}>
                <ThemeToggle clicked={props.toggleTheme}/>
                <br/>
                <a title="Besök sidans datakälla" target = "_blank" rel="noreferrer" href="https://apify.com/covid-19"> Besök datakälla  </a>
                <br/>
            </div>

        </Fragment>
    );
};

export default sideDrawer;