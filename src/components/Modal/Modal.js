import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";


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