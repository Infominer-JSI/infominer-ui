// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./IconButton.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IIconButton {
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

export default function IconButton(props: IIconButton) {
  // get dataset information and set their state
  const {
    icon = "plus",
    variant = "base",
    size = "medium",
    type = "full",
    disabled = false,
    className,
    onClick,
  } = props;

  // get the icon component
  const SelectedIcon = getIcon(icon, size);

  const typeClass = getTypeClass(type);
  const sizeClass = getSizeClass(size);
  const variantClass = getVariantClass(variant);
  const buttonClass = cn(styles["button"], variantClass, typeClass, sizeClass, className);
  return (
    <button
      className={buttonClass}
      onClick={!disabled ? onClick : undefined}
      aria-label="Icon Button"
      disabled={disabled}>
      {SelectedIcon}
    </button>
  );
}

function getVariantClass(color?: IIconButton["variant"]) {
  switch (color) {
    case "base":
      return styles["variant--base"];
    case "muted":
      return styles["variant--muted"];
    case "inactive":
      return styles["variant--inactive"];
    case "warning":
      return styles["variant--warning"];
    default:
      return null;
  }
}

function getTypeClass(type: IIconButton["type"]) {
  switch (type) {
    case "outline":
      return styles["type--outline"];
    case "full":
      return styles["type--full"];
  }
}

function getSizeClass(type: IIconButton["size"]) {
  switch (type) {
    case "small":
      return styles["size--small"];
    case "large":
      return styles["size--large"];
    case "medium":
    default:
      return styles["size--medium"];
  }
}

function getIcon(icon: IIconButton["icon"], size?: IIconButton["size"]) {
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
