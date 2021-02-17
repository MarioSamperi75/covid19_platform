import React from "react";

import "./RegionTable.css"
import  imagePath from "../../data/imagePath.json"

/**
 * @alias RegionTable
 * @memberOf Layout
 * @param {Array<Object>} props.data the data object regarding the region selected by the user
 * @param {string} props.option the selected option in Dropdown
 * @param {string} props.regionName - the selected region in the SVGMap
 * @param {boolean} props.darkTheme -To communicate the state of the theme (dark/light) to the component
 * @return {JSX.Element}
 * @description The class component RegionTable returns a div that contains two tables.
 * The first one contains the name of the region and the flag,
 * the second one contains the data for the selected region.
 * The data changes dinamically depending on the user's choice in the Map component.
 * An item of the second table is marked depending on the user's choice in the Dropdown component.
 */
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
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)', margin : '1.06rem 0 0 0.5rem'}:{margin : '1.06rem 0 0 0.5rem'}}>
               <tbody>

                   <tr key="r1">
                       <td
                           title="Totalt antal infekterade"
                           style={props.option === 'Smittade' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key RegionPaddingTop">
                           Smittade:
                       </td>
                       <td
                           style={props.option === 'Smittade' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.infectedCount}
                       </td>
                   </tr>

                   <tr key="r2">
                       <td
                           title="Infekterade per 100000"
                           style={props.option === 'Smittade per 100000' ? { fontWeight: 'bold' , textDecoration: "underline"} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Smittade per 100000' ? { fontWeight: 'bold' , textDecoration: "underline"} : {}}
                           className="Value">
                           {props.data.infectedPer100000}
                       </td>
                   </tr>

                   <tr key="r3">
                       <td
                           title="Daglig ökning av infektering"
                           className="Key">
                           Ökning:
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
                           Ökning:
                       </td>
                       <td
                           className="Value">
                           {props.data.newDeaths}
                       </td>
                   </tr>

                   <tr key="r7">
                       <td
                           title="Totalt antal intensivvårds patienter"
                           style={props.option === 'IVA' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key RegionPaddingTop">
                           Intensivvård:
                       </td>
                       <td
                           style={props.option === 'IVA' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.intensiveCareCount}
                       </td>
                   </tr>

                   <tr key="r8">
                       <td
                           title="Intensivvårds patienter per 100000"
                           style={props.option === 'IVA per 100000' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'IVA per 100000' ? { fontWeight: 'bold', textDecoration: "underline"} : {}}
                           className="Value">
                           {props.data.intensiveCarePer100000}
                       </td>
                   </tr>

                   <tr key="r9">
                       <td
                           title="Daglig ökning av intensivvårds patienter"
                           className="Key">
                           Ökning:
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



