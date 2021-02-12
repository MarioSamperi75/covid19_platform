import React from "react";

import "./SwedenTable.css"
import  imagePath from "../../data/imagePath.json"

const swedenTable = (props) => {



    return (


       <div className="Container">
           <div className = "SwedenSubDiv" style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)'}:{}}>
               <p className="Title">Sweden</p>
               <img className="Vapen" src={imagePath.Sweden}  alt="Vapen"/>

           </div>
           <table className = "SwedenSubDiv"
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)', margin : '0 0 0 0.5rem'}:{}}>

               <tbody>

                   <tr><td className="UpdateText1">last update:</td></tr>
                   <tr><td className="UpdateText2">{props.lastUpdate}</td></tr>


                   <tr key="r1">
                       <td className="Key PaddingTop">Infected: </td>
                       <td className="Value PaddingTop">{props.data.infected}</td>
                   </tr>
                   <tr key="r2">
                       <td className="Key">Per millon:</td>
                       <td className="Value">{props.data.infectedPerMilion}</td>
                   </tr>
                   <tr key="r3">
                       <td className="Key">Daily increase: </td>
                       <td className="Value">{props.data.dailyInfected}</td>
                   </tr>


                   <tr key="r4">
                       <td className="Key PaddingTop">Deceased: </td>
                       <td className="Value PaddingTop">{props.data.deceased}</td>
                   </tr>
                   <tr key="r5">
                       <td className="Key">Per millon:</td>
                       <td className="Value">{props.data.deathsPerMilion}</td>
                   </tr>
                   <tr key="r6">
                       <td className="Key">Daily increase: </td>
                       <td className="Value">{props.data.dailyDeaths}</td>
                   </tr>


                   <tr key="r7">
                       <td className="Key PaddingTop">IntensiveCare: </td>
                       <td className="Value PaddingTop">{props.data.intensiveCare}</td>
                   </tr>
                   <tr key="r8">
                       <td className="Key">Per millon:</td>
                       <td className="Value">{props.data.intensiveCarePerMilion}</td>
                   </tr>
                   <tr key="r9">
                       <td className="Key">Daily increase: </td>
                       <td className="Value">{props.data.dailyIntensiveCare}</td>
                   </tr>
               </tbody>
           </table>
       </div>
    );
};

export default swedenTable;
