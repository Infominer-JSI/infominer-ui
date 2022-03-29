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
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

//===============================================
// Define the component
//===============================================

export default function Column(props: IColumn) {
  // get dataset information and set their state
  const { text, sort = "none", disabled, onClick, className } = props;

  // get the icon component
  const SelectedIcon = getIcon(sort);

  // assign the button style
  const buttonClass = cn(styles["column"], className, {
    [styles["column--active"]]: sort !== "none",
    [styles["column--disabled"]]: disabled,
  });
  return (
    <button className={buttonClass} onClick={!disabled ? onClick : undefined}>
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
