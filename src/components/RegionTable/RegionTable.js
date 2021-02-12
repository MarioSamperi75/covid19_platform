import React from "react";

import "./RegionTable.css"
import  imagePath from "../../data/imagePath.json"

const regionTable = (props) => {

    return (

       <div className="Container">

           <table className = "RegionSubDiv" style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>
               <tbody>

                   <tr key="r01">
                       <td
                           className="RegionTitle">
                           {props.regionName}
                       </td>
                   </tr>
                   <tr key="r02">
                       <td style={{textAlign: 'center'}}>
                       <img className="RegionVapen" src={imagePath.[props.regionName]}  title = {props.regionName} alt="Vapen" draggable={false}/>
                       </td>
                   </tr>

               </tbody>
           </table>



           <table className = "RegionSubDiv"
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>
               <tbody>

                   <tr key="r1">
                       <td
                           title="Totalt antal infekterade"
                           style={props.option === 'Infekterade' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key RegionPaddingTop">
                           Infekterade:
                       </td>
                       <td
                           style={props.option === 'Infekterade' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.infectedCount}
                       </td>
                   </tr>

                   <tr key="r2">
                       <td
                           title="Infekterade per 100000"
                           style={props.option === 'Infekterade per 100000' ? { fontWeight: 'bold' , textDecoration: "underline"} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Infekterade per 100000' ? { fontWeight: 'bold' , textDecoration: "underline"} : {}}
                           className="Value">
                           {props.data.infectedPer100000}
                       </td>
                   </tr>

                   <tr key="r3">
                       <td
                           title="Daglig ökning av infektering"
                           className="Key">
                           Daglig ökning:
                       </td>
                       <td
                           className="Value">
                           {props.data.newInfected}
                       </td>
                   </tr>

                   <tr key="r4">
                       <td
                           title="Totalt antal avlidna"
                           style={props.option === 'Avlidna' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key RegionPaddingTop">
                           Avlidna:
                       </td>
                       <td
                           style={props.option === 'Avlidna' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.deathCount}
                       </td>
                   </tr>

                   <tr key="r5">
                       <td
                           title="Avlidna per 100000"
                           style={props.option === 'Avlidna per 100000' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Avlidna per 100000' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value">
                           {props.data.deathsPer100000}
                       </td>
                   </tr>

                   <tr key="r6">
                       <td
                           title="Daglig ökning av avlidna"
                           className="Key">
                           Daglig ökning:
                       </td>
                       <td
                           className="Value">
                           {props.data.newDeaths}
                       </td>
                   </tr>

                   <tr key="r7">
                       <td
                           title="Totalt antal intensivvårds patienter"
                           style={props.option === 'Intensivvård' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key RegionPaddingTop">
                           Intensivvård:
                       </td>
                       <td
                           style={props.option === 'Intensivvård' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.intensiveCareCount}
                       </td>
                   </tr>

                   <tr key="r8">
                       <td
                           title="Intensivvårds patienter per 100000"
                           style={props.option === 'Intensivvård per 100000' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Intensivvård per 100000' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value">
                           {props.data.intensiveCarePer100000}
                       </td>
                   </tr>

                   <tr key="r9">
                       <td
                           title="Daglig ökning av intensivvårds patienter"
                           className="Key">
                           Daglig ökning:
                       </td>
                       <td
                           className="Value">
                           {props.data.newIntensiveCare}
                       </td>
                   </tr>

               </tbody>
           </table>
       </div>
    );
};

export default regionTable;



