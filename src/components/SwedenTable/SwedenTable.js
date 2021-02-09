import React from "react";

import "./SwedenTable.css"
import  imagePath from "../../data/imagePath.json"

const swedenTable = (props) => {



    return (


       <div className="Container" style={{display : 'flex', margin : '0 auto 12px'}}>
           <div className = "Part">
               <p className="Title">Sweden</p>
               <img className="Vapen" src={imagePath.Sweden}  alt="Vapen"/>

           </div>
           <div className = "Part">

               <p className={"UpdateText"}><i>last update:  {props.lastUpdate}</i></p>

               <tr key="r1">
                   <td className="Key">Infected: </td>
                   <td className="Value">{props.data.infected}</td>
               </tr>
               <tr key="r2">
                   <td className="Key">Infected(X M): </td>
                   <td className="Value">{props.data.infectedPerMilion}</td>
               </tr>
               <tr key="r3">
                   <td className="Key">Daily increase: </td>
                   <td className="Value">{props.data.dailyInfected}</td>
               </tr><br/>

               <tr key="r4">
                   <td className="Key">Deceased: </td>
                   <td className="Value">{props.data.deceased}</td>
               </tr>
               <tr key="r5">
                   <td className="Key">Deceased(X M): </td>
                   <td className="Value">{props.data.deathsPerMilion}</td>
               </tr>
               <tr key="r6">
                   <td className="Key">Daily increase: </td>
                   <td className="Value">{props.data.dailyDeaths}</td>
               </tr><br/>

               <tr key="r7">
                   <td className="Key">IntensiveCare: </td>
                   <td className="Value">{props.data.intensiveCare}</td>
               </tr>
               <tr key="r8">
                   <td className="Key">IntensiveCare(X M): </td>
                   <td className="Value">{props.data.intensiveCarePerMilion}</td>
               </tr>
               <tr key="r9">
                   <td className="Key">Daily increase: </td>
                   <td className="Value">{props.data.dailyIntensiveCare}</td>
               </tr><br/>
           </div>
       </div>
    );
};

export default swedenTable;
