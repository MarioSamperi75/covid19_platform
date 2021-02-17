import React from "react";
import "./Backdrop.css";


/**
 * @alias Backdrop
 * @memberOf Layout
 * @param void
 * @return {JSX.Element}
 * @description The functional component Backdrop is just a semi-trasparent div that fills the whole screen
 * and makes any user interaction impossible. It is often used as a child of a modal.
 *
 */
const backdrop = () =>

    <div className="Backdrop"></div>

export default backdrop;
