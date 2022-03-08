// import modules
import cn from "classnames";

// import styles and icons
import styles from "./Pill.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IPill {
  type: "text" | "number";
  color?: "blue" | "green" | "pink";
  className?: string;
  children?: React.ReactNode;
}

//===============================================
// Define the component
//===============================================

export default function Pill(props: IPill) {
  // get dataset information and set their state
  const { type = "text", color, className, children } = props;

  const colorClass = getColorClass(color);
  const typeClass = getTypeClass(type);
  const elementClass = cn(styles.default, colorClass, typeClass, className);

  return <span className={elementClass}>{children}</span>;
}

//===============================================
// Define the helper functions
//===============================================

function getColorClass(color?: IPill["color"]) {
  switch (color) {
    case "blue":
      return styles.blue;
    case "green":
      return styles.green;
    case "pink":
      return styles.pink;
    default:
      return null;
  }
}

function getTypeClass(type?: IPill["type"]) {
  switch (type) {
    case "text":
      return styles["type-text"];
    case "number":
      return styles["type-number"];
    default:
      return null;
  }
}
