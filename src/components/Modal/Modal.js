import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

/**
 * @alias Modal
 * @memberOf Layout
 * @param props props declared in parent
 * @return {JSX.Element}
 * @description The functional component Modal returns the element modal that contains the backdrop element which notifies
 * the user that the page is loading. The show prop is connected with the loading state of layout.js to determine if the backdrop
 * should render.
 */

const modal = (props) =>
    props.show ? (
        <Fragment>
            <Backdrop/>
            <div className="Modal"
            >
                {props.children}
            </div>
        </Fragment>
    ) : null;

export default modal;