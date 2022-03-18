// import modules
import React from "react";
import cn from "classnames";

// import components
import Icon from "components/Icon";
import Pill from "components/Pill";

// import styles
import styles from "./Button.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IButton {
  children?: React.ReactNode;
  icon?: "none" | "plus" | "xmark" | "angle-left" | "angle-down" | "database" | "drag";
  iconPosition?: "left" | "right";
  type?: "full" | "outline" | "borderless";
  variant?: "base" | "muted" | "inactive" | "warning";
  number?: number | null | undefined;
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
    children,
    number = null,
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

  // get the icon component
  const SelectedIcon = getIcon(icon);

  const typeClass = getTypeClass(type);
  const variantClass = getVariantClass(variant);
  const buttonClass = cn(styles["button"], variantClass, typeClass, className, {
    [styles["icon-only"]]: !children,
  });
  return (
    <button
      className={buttonClass}
      onDrag={!disabled ? onDrag : undefined}
      onClick={!disabled ? onClick : undefined}
      draggable={!disabled ? draggable : false}
      disabled={disabled}>
      {iconPosition === "left" && SelectedIcon}
      <span className={styles["button__content"]}>
        {number !== null ? (
          <Pill type="round" status="loading">
            {number}
          </Pill>
        ) : null}
        {children}
      </span>
      {iconPosition === "right" && SelectedIcon}
    </button>
  );
}

function getVariantClass(color?: IButton["variant"]) {
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

function getTypeClass(type: IButton["type"]) {
  switch (type) {
    case "full":
      return styles["type--full"];
    case "outline":
      return styles["type--outline"];
    case "borderless":
      return styles["type--borderless"];
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
