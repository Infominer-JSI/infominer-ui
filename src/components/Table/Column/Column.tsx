// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./Column.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IColumn {
  text?: string;
  sort?: "none" | "asc" | "desc";
  className?: string;
  onClick?: () => void;
}

//===============================================
// Define the component
//===============================================

export default function Column(props: IColumn) {
  // get dataset information and set their state
  const { text, sort = "none", className, onClick } = props;

  // get the icon component
  const SelectedIcon = getIcon(sort);

  // assign the button style
  const buttonStyle = cn(styles.default, className, {
    [styles.active]: sort !== "none",
  });
  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
      {SelectedIcon}
    </button>
  );
}

function getIcon(icon?: IColumn["sort"]) {
  switch (icon) {
    case "asc":
      return <Icon type="angle-up" size="sm" />;
    case "desc":
      return <Icon type="angle-down" size="sm" />;
    default:
      return null;
  }
}
