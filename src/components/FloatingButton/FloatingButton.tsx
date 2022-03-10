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
  icon?: "plus" | "chart";
  size?: "small" | "medium";
  className?: string;
  onClick: () => void;
}

//===============================================
// Define the component
//===============================================

export default function Button(props: IFloatingButton) {
  // get dataset information and set their state
  const { icon = "plus", size = "medium", className, onClick } = props;

  // set the button classes
  const sizeClass = getSizeClass(size);
  // get the icon component
  const SelectedIcon = getIcon(icon);

  // assign the button style
  const buttonStyle = cn(styles.button, sizeClass, className);
  return (
    <div className={styles.container}>
      <span className={styles.pulse}></span>
      <button className={buttonStyle} onClick={onClick}>
        {SelectedIcon}
      </button>
    </div>
  );
}

function getSizeClass(size: IFloatingButton["size"]) {
  switch (size) {
    case "small":
      return styles.small;
    case "medium":
    default:
      return styles.medium;
  }
}

function getIcon(icon?: IFloatingButton["icon"]) {
  switch (icon) {
    case "plus":
      return <Icon type="plus" size="xl" />;
    case "chart":
      return <Icon type="xmark" size="lg" />;
    default:
      return null;
  }
}
