// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./Action.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IAction {
  text: string;
  icon?: "none" | "dashboard" | "table" | "compare";
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

//===============================================
// Define the component
//===============================================

export default function Action(props: IAction) {
  // get dataset information and set their state
  const { text, icon = "none", active = false, className, onClick } = props;

  // get the icon component
  const SelectedIcon = getIcon(icon);

  // assign the button style
  const buttonStyle = cn(styles.default, className, {
    [styles.active]: active,
  });
  return (
    <button className={buttonStyle} onClick={onClick}>
      {SelectedIcon}
      {text}
    </button>
  );
}

function getIcon(icon?: IAction["icon"]) {
  switch (icon) {
    case "dashboard":
      return <Icon type="gauge" size="lg" />;
    case "table":
      return <Icon type="table" size="lg" />;
    case "compare":
      return <Icon type="square-poll" size="lg" />;
    default:
      return null;
  }
}
