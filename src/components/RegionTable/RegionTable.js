import React from "react";

import "./RegionTable.css"
import  imagePath from "../../data/imagePath.json"

const regionTable = (props) => {

    return (

       <div className="Container" style={{display : 'flex', margin : '0 0 12px'}}>




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
                       <img className="RegionVapen" src={imagePath.[props.regionName]}  alt="Vapen"/>
                       </td>
                   </tr>

               </tbody>
           </table>



           <table className = "RegionSubDiv"
                  style = {props.darkTheme ? {borderColor : 'RGB(82,82,82)', margin : '17px 0px 0px 8px'}:{}}>
               <tbody>

                   <tr key="r1">
                       <td
                           style={props.option === 'Infected' ? { fontWeight: 'bold'} : {}}
                           className="Key RegionPaddingTop">
                           Infected:
                       </td>
                       <td
                           style={props.option === 'Infected' ? { fontWeight: 'bold'} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.infectedCount}
                       </td>
                   </tr>

                   <tr key="r2">
                       <td
                           style={props.option === 'Infected X 100000' ? { fontWeight: 'bold'} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Infected X 100000' ? { fontWeight: 'bold'} : {}}
                           className="Value">
                           {props.data.infectedPer100000}
                       </td>
                   </tr>

                   <tr key="r3">
                       <td
                           className="Key">
                           Daily increase:
                       </td>
                       <td
                           className="Value">
                           {props.data.newInfected}
                       </td>
                   </tr>

                   <tr key="r4">
                       <td
                           style={props.option === 'Deceased' ? { fontWeight: 'bold'} : {}}
                           className="Key RegionPaddingTop">
                           Infected:
                       </td>
                       <td
                           style={props.option === 'Deceased' ? { fontWeight: 'bold'} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.deathCount}
                       </td>
                   </tr>

                   <tr key="r5">
                       <td
                           style={props.option === 'Deceased X 100000' ? { fontWeight: 'bold'} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Deceased X 100000' ? { fontWeight: 'bold'} : {}}
                           className="Value">
                           {props.data.deathsPer100000}
                       </td>
                   </tr>

                   <tr key="r6">
                       <td
                           className="Key">
                           Daily increase:
                       </td>
                       <td
                           className="Value">
                           {props.data.newDeaths}
                       </td>
                   </tr>

                   <tr key="r7">
                       <td
                           title="intensive Care"
                           style={props.option === 'Intensive Care' ? { fontWeight: 'bold'} : {}}
                           className="Key RegionPaddingTop">
                           IntensiveCare:
                       </td>
                       <td
                           style={props.option === 'Intensive Care' ? { fontWeight: 'bold'} : {}}
                           className="Value RegionPaddingTop">
                           {props.data.intensiveCareCount}
                       </td>
                   </tr>

                   <tr key="r8">
                       <td
                           style={props.option === 'Intensive Care X 100000' ? { fontWeight: 'bold'} : {}}
                           className="Key">
                           Per 100000:
                       </td>
                       <td
                           style={props.option === 'Intensive Care X 100000' ? { fontWeight: 'bold'} : {}}
                           className="Value">
                           {props.data.intensiveCarePer100000}
                       </td>
                   </tr>

                   <tr key="r9">
                       <td
                           className="Key">
                           Daily increase:
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



