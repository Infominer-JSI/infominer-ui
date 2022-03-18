// import modules
import cn from "classnames";

// import styles and icons
import styles from "./Pill.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IPill {
  type: "block" | "round";
  status?: "ready" | "loading" | "waiting" | "warning";
  className?: string;
  children?: React.ReactNode;
}

//===============================================
// Define the component
//===============================================

export default function Pill(props: IPill) {
  // get dataset information and set their state
  const { type = "block", status, className, children } = props;

  const typeClass = getTypeClass(type);
  const statusClass = getStatusClass(status);
  const pillClass = cn(styles.pill, statusClass, typeClass, className);

  return <span className={pillClass}>{children}</span>;
}

//===============================================
// Define the helper functions
//===============================================

function getStatusClass(status?: IPill["status"]) {
  switch (status) {
    case "ready":
      return styles["status--ready"];
    case "loading":
      return styles["status--loading"];
    case "waiting":
      return styles["status--waiting"];
    case "warning":
      return styles["status--warning"];
    default:
      return styles["status--default"];
  }
}

function getTypeClass(type?: IPill["type"]) {
  switch (type) {
    case "block":
      return styles["type--block"];
    case "round":
      return styles["type--round"];
    default:
      return null;
  }
}
