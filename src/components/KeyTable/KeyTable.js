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
    <div>
        <div className = "KeyTableDiv1">
            <div className = "Yellow"></div> <p className = "Label">min</p>
        </div>
        <div className = "KeyTableDiv2">
            <div className = "Red"></div> <p className = "Label">max</p>
        </div>
    </div>
);

export default keyTable;