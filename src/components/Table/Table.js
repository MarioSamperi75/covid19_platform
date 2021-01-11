import React from "react";

import "./Table.css"

const table = (props) => {



    const dummyData = props.dummyData
    const tableData =dummyData.map((dataItem) =>{
    return(
        <tr key={dataItem.id}>
            <td>{dataItem.id}</td>
            <td>{dataItem.name}</td>
            <td>{dataItem.age}</td>
            <td>{dataItem.email}</td>
        </tr>)
    }
)



    return (
        <div className="tableDiv">
            <h1>React Dynamic Table</h1>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>th1</th>
                        <th>th2</th>
                        <th>th3</th>
                        <th>th4</th>
                    </tr>
                    {tableData}
                    </tbody>
                </table>


        </div>
    );
};

export default table;
