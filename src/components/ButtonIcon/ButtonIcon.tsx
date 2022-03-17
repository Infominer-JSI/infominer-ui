// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./ButtonIcon.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IButtonIcon {
  icon: "plus" | "xmark" | "download" | "delete" | "edit" | "sort" | "filter" | "save";
  variant?: "base" | "muted" | "inactive" | "warning";
  size?: "small" | "medium" | "large";
  type?: "full" | "outline";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

//===============================================
// Define the component
//===============================================

export default function ButtonIcon(props: IButtonIcon) {
  // get dataset information and set their state
  const {
    icon,
    variant = "base",
    size = "medium",
    type = "full",
    disabled = false,
    className,
    onClick,
  } = props;

  // set the button classes
  const variantClass = getVariantClass(variant);
  const typeClass = getTypeClass(type);
  const sizeClass = getSizeClass(size);
  // get the icon component
  const SelectedIcon = getIcon(icon, size);

  // assign the button style
  const buttonClass = cn(styles.default, variantClass, typeClass, sizeClass, className);
  return (
    <button className={buttonClass} onClick={!disabled ? onClick : undefined} disabled={disabled}>
      {SelectedIcon}
    </button>
  );
}

function getVariantClass(color?: IButtonIcon["variant"]) {
  switch (color) {
    case "base":
      return styles.base;
    case "muted":
      return styles.muted;
    case "inactive":
      return styles.inactive;
    case "warning":
      return styles.warning;
    default:
      return null;
  }
}

function getTypeClass(type: IButtonIcon["type"]) {
  switch (type) {
    case "outline":
      return styles.outline;
    case "full":
      return styles.full;
  }
}

function getSizeClass(type: IButtonIcon["size"]) {
  switch (type) {
    case "small":
      return styles.small;
    case "large":
      return styles.large;
    case "medium":
    default:
      return styles.medium;
  }
}

function getIcon(icon: IButtonIcon["icon"], size?: IButtonIcon["size"]) {
  const iconSize = size === "small" ? "xs" : size === "medium" ? "base" : "md";
  console.log(iconSize);
  switch (icon) {
    case "plus":
      return <Icon type="plus" size={iconSize} />;
    case "xmark":
      return <Icon type="xmark" size={iconSize} />;
    case "download":
      return <Icon type="download" size={iconSize} />;
    case "delete":
      return <Icon type="trash-can" size={iconSize} />;
    case "edit":
      return <Icon type="edit" size={iconSize} />;
    case "sort":
      return <Icon type="sort" size={iconSize} />;
    case "filter":
      return <Icon type="filter" size={iconSize} />;
    case "save":
      return <Icon type="floppy-disk" size={iconSize} />;
    default:
      return null;
  }
}
