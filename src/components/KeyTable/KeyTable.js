import "./KeyTable.css";

/**
 * @alias KeyTable
 * @memberOf Layout
 * @param props
 * @return {JSX.Element}
 * @description This component is just a key table, a grafical element that explain the meaning of the colors.
 * No interaction is allowed.
 */
const keyTable = (props) => (
    <div className="KeyContainer">
        <div className = "KeyTableDiv1">
            <div className = "Yellow" title = "Gul"></div> <p className = "Label" title = "Minimal">min</p>
        </div>
        <div className = "KeyTableDiv2">
            <div className = "Red" title = "Röd"></div> <p className = "Label" title = "Maximal">max</p>
        </div>
    </div>
);

export default keyTable;