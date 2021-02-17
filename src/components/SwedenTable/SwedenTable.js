import React from "react";

import "./SwedenTable.css"
import  imagePath from "../../data/imagePath.json"

/**
 * @alias SwedenTable
 * @memberOf Layout
 * @param props props declared in parent
 * @return {JSX.Element}
 * @description The component SwedenTable returns the element swedenTable that
 * presents a summery of swedens combined statistics. Props is used to theme the component and
 * get data from state of Layout.js
 */
const swedenTable = (props) => {
    return (
       <div className="SwedenContainer">
           <table className = "SwedenSubDiv"
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>
               <tbody>

                   <tr key="r01">
                       <td
                           className="Title">
                           Sverige
                       </td>
                   </tr>
                   <tr key="r02">
                       <td style={{textAlign: 'center'}}>
                           <img className="Vapen" src={imagePath.Sweden}  title = "Sverige" alt="Vapen" draggable={false}/>
                       </td>
                   </tr>

               </tbody>
           </table>

           <table className = "SwedenSubDiv"
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)', marginLeft : '0.5rem', marginRight :'0'}:{marginLeft : '0.5rem', marginRight :'0'}}>

               <tbody>

                   <tr><td className="UpdateText1" title="Senast statistiken uppdaterades">Uppdaterad:</td></tr>
                   <tr><td className="UpdateText2">{props.lastUpdate}</td></tr>


                   <tr key="r1">
                       <td className="Key PaddingTop" title="Infekterade Totalt">Smittade: </td>
                       <td className="Value PaddingTop">{props.data.infected}</td>
                   </tr>
                   <tr key="r2">
                       <td className="Key" title = "Infekterade per miljon">Per miljon:</td>
                       <td className="Value">{props.data.infectedPerMilion}</td>
                   </tr>
                   <tr key="r3">
                       <td className="Key" title="Daglig ökning av infekterade">Ökning: </td>
                       <td className="Value">{props.data.dailyInfected}</td>
                   </tr>


                   <tr key="r4">
                       <td className="Key PaddingTop" title="Avlidna totalt">Avlidna: </td>
                       <td className="Value PaddingTop">{props.data.deceased}</td>
                   </tr>
                   <tr key="r5">
                       <td className="Key" title="Avlidna per miljon">Per miljon:</td>
                       <td className="Value">{props.data.deathsPerMilion}</td>
                   </tr>
                   <tr key="r6">
                       <td className="Key" title="Daglig ökning av dödsfall">Ökning: </td>
                       <td className="Value">{props.data.dailyDeaths}</td>
                   </tr>


                   <tr key="r7">
                       <td className="Key PaddingTop" title="Intensivvårds patienter totalt">Intensivvård: </td>
                       <td className="Value PaddingTop">{props.data.intensiveCare}</td>
                   </tr>
                   <tr key="r8">
                       <td className="Key" title="Intensivvårds patienter per miljon">Per miljon:</td>
                       <td className="Value">{props.data.intensiveCarePerMilion}</td>
                   </tr>
                   <tr key="r9">
                       <td className="Key" title="Daglig ökning av intensivvårds patienter">Ökning: </td>
                       <td className="Value">{props.data.dailyIntensiveCare}</td>
                   </tr>
               </tbody>
           </table>
       </div>
    );
};

export default swedenTable;
