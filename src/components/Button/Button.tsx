// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./Button.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IButton {
  text?: string;
  icon?: "none" | "plus" | "xmark" | "angle-left" | "angle-down" | "database" | "drag";
  iconPosition?: "left" | "right";
  type?: "full" | "outline";
  variant?: "base" | "muted" | "inactive" | "warning";
  disabled?: boolean;
  draggable?: boolean;
  className?: string;
  onClick?: () => void;
  onDrag?: () => void;
}

//===============================================
// Define the component
//===============================================

export default function Button(props: IButton) {
  // get dataset information and set their state
  const {
    text,
    icon = "none",
    iconPosition = "left",
    type = "full",
    variant = "base",
    disabled = false,
    draggable = false,
    className,
    onClick,
    onDrag,
  } = props;

  // set the button classes
  const variantClass = getVariantClass(variant);
  const typeClass = getTypeClass(type);
  // get the icon component
  const SelectedIcon = getIcon(icon);

  // assign the button style
  const buttonStyle = cn(styles.default, variantClass, typeClass, className, {
    [styles["icon-only"]]: !text,
    [styles.disabled]: disabled,
  });
  return (
    <button
      className={buttonStyle}
      onDrag={!disabled ? onDrag : () => {}}
      onClick={!disabled ? onClick : () => {}}
      draggable={!disabled ? draggable : false}
      disabled={disabled}>
      {iconPosition === "left" && SelectedIcon}
      {text}
      {iconPosition === "right" && SelectedIcon}
    </button>
  );
}

function getVariantClass(color?: IButton["variant"]) {
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

function getTypeClass(type: IButton["type"]) {
  switch (type) {
    case "outline":
      return styles.outline;
    case "full":
      return styles.full;
  }
}

function getIcon(icon?: IButton["icon"]) {
  switch (icon) {
    case "plus":
      return <Icon type="plus" size="sm" />;
    case "xmark":
      return <Icon type="xmark" size="sm" />;
    case "angle-left":
      return <Icon type="angle-left" size="sm" />;
    case "angle-down":
      return <Icon type="angle-down" size="sm" />;
    case "database":
      return <Icon type="database" size="sm" />;
    case "drag":
      return <Icon type="grip-vertical" size="sm" />;
    default:
      return null;
  }
}
