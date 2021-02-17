import React from "react";

import "./Table.css"

/**
 * @alias Table
 * @memberOf Layout
 * @param props props declared in parent
 * @return {JSX.Element}
 * @description The component Table returns the element table that presents statistics
 * about the current region the user has selected. Data about the selected region is passed from Layput.js
 * to this component using props to update dynamically when a region is clicked
 */
const table = (props) => {

    const dataRegion = props.dataRegion
    const tableData =dataRegion.map((dataItem) =>{
    return(
        <tr key={dataItem.region}>
            <td className="LeftAlign">{dataItem.region}</td>
            <td>{dataItem.infectedCount}</td>
            <td>{dataItem.deathCount}</td>
            <td>{dataItem.intensiveCareCount}</td>
        </tr>)
        }
    )

    return (
        <div className="SummaryTableDiv">

            <table  className="SummaryTable">

                    <tbody>
                    <tr>
                        <th className="LeftAlign">Region</th>
                        <th title="Infekterade Totalt">Smittade </th>
                        <th title="Avlidna totalt">Avlidna </th>
                        <th title="Intensivvårds patienter totalt">IVA</th>
                    </tr>
                    {tableData}
                    </tbody>
                </table>
        </div>
    );
};

export default table;