// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./FloatingButton.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IFloatingButton {
  icon?: "plus" | "chart" | "cross";
  size?: "small" | "medium";
  className?: string;
  onClick: () => void;
}

//===============================================
// Define the component
//===============================================

export default function FloatingButton(props: IFloatingButton) {
  // get dataset information and set their state
  const { icon = "plus", size = "medium", className, onClick } = props;

  // get the icon component
  const SelectedIcon = getIcon(icon);

  // set the button classes
  const sizeClass = getSizeClass(size);
  const buttonClass = cn(styles["button"], sizeClass, className);
  return (
    <div className={styles["container"]}>
      <span className={styles["container__pulse"]}></span>
      <button className={buttonClass} onClick={onClick} aria-label="Action Button">
        {SelectedIcon}
      </button>
    </div>
  );
}

function getSizeClass(size: IFloatingButton["size"]) {
  switch (size) {
    case "small":
      return styles["size--small"];
    case "medium":
    default:
      return styles["size--medium"];
  }
}

function getIcon(icon?: IFloatingButton["icon"]) {
  switch (icon) {
    case "plus":
      return <Icon type="plus" size="xl" />;
    case "cross":
      return <Icon type="xmark" size="xl" />;
    case "chart":
      return <Icon type="chart-column" size="xl" />;
    default:
      return null;
  }
}
