import React from "react";

import "./Table.css"

const table = (props) => {

    const dataRegion = props.dataRegion
    const tableData =dataRegion.map((dataItem) =>{
    return(
        <tr key={dataItem.region}>
            <td>{dataItem.region}</td>
            <td>{dataItem.infectedCount}</td>
            <td>{dataItem.deathCount}</td>
            <td>{dataItem.intensiveCareCount}</td>
        </tr>)
        }
    )
       //<h3>last update:  {props.lastUpdate}</h3>

    return (
        <div className="table1Div">
            <table className="table" title = "Statistics">
                    <tbody>
                    <tr>
                        <th>Region</th>
                        <th>Infected</th>
                        <th>Deaths</th>
                        <th>Intensive Care</th>
                    </tr>
                    {tableData}
                    </tbody>
                </table>
        </div>
    );
};

export default table;