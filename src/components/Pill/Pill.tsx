// import modules
import cn from "classnames";

// import styles and icons
import styles from "./Pill.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IPill {
  type: "text" | "number";
  status?: "ready" | "loading" | "waiting" | "warning";
  className?: string;
  children?: React.ReactNode;
}

//===============================================
// Define the component
//===============================================

export default function Pill(props: IPill) {
  // get dataset information and set their state
  const { type = "text", status, className, children } = props;

  const typeClass = getTypeClass(type);
  const statusClass = getStatusClass(status);
  const elementClass = cn(statusClass, typeClass, className);

  return <span className={elementClass}>{children}</span>;
}

//===============================================
// Define the helper functions
//===============================================

function getStatusClass(status?: IPill["status"]) {
  switch (status) {
    case "ready":
      return styles.ready;
    case "loading":
      return styles.loading;
    case "waiting":
      return styles.waiting;
    case "warning":
      return styles.warning;
    default:
      return styles.default;
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
