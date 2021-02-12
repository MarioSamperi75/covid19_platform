import React from "react";

import "./SwedenTable.css"
import  imagePath from "../../data/imagePath.json"

const swedenTable = (props) => {



    return (



       <div className="Container" style={{display : 'flex', margin : '0 auto 12px'}}>
           <div className = "SwedenSubDiv" style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>
               <p className="Title">Sverige</p>
               <img className="Vapen" src={imagePath.Sweden}  alt="Vapen" draggable={false}/>

           </div>
           <table className = "SwedenSubDiv"
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)', margin : '0 0 0 0.5rem'}:{}}>

               <tbody>

                   <tr><td className="UpdateText1" title="Senast statistiken uppdaterades">Senast uppdaterad:</td></tr>
                   <tr><td className="UpdateText2">{props.lastUpdate}</td></tr>


                   <tr key="r1">
                       <td className="Key PaddingTop" title="Infekterade Totalt">Infekterade: </td>
                       <td className="Value PaddingTop">{props.data.infected}</td>
                   </tr>
                   <tr key="r2">
                       <td className="Key" title = "Infekterade per miljon">Per miljon:</td>
                       <td className="Value">{props.data.infectedPerMilion}</td>
                   </tr>
                   <tr key="r3">
                       <td className="Key" title="Daglig ökning av infekterade">Daglig ökning: </td>
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
                       <td className="Key" title="Daglig ökning av dödsfall">Daglig ökning: </td>
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
                       <td className="Key" title="Daglig ökning av intensivvårds patienter">Daglig ökning: </td>
                       <td className="Value">{props.data.dailyIntensiveCare}</td>
                   </tr>
               </tbody>
           </table>
       </div>
    );
};

export default swedenTable;
