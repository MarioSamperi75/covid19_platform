import "./ThemeToggle.css";

/**
 * @alias ThemeToggle
 * @memberOf Layout
 * @param {function} props.toggleTheme To toggle the theme between dark and light
 * @return {JSX.Element}
 * @description The functional component ThemeToggle returns the element themeToggle that
 * is used to switch between the applications light and dark themes. The onClick prop is connected with Layout
 * through the components SideDrawer and Toolbar where it inverts the boolean value of the state 'useDarkTheme' by invoking the method toggleThemeHandler.
 */
const themeToggle = (props) => (
    <div className = "ThemeToggle">
        <button onClick={props.clicked} title="Växla tema">
            <img src={"images/themeToggle.png"} alt={"Toggle theme!"} draggable={false}/>
        </button>
    </div>
);

export default themeToggle;