// import modules
import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./Slideout.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface ISlideout {
  isOpen: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  width?: "medium" | "large" | "full";
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

//===============================================
// Define the component
//===============================================

export default function Slideout(props: ISlideout) {
  const {
    isOpen = false,
    showCloseButton = true,
    closeOnOutsideClick = true,
    width = "medium",
    title,
    content,
    actions,
  } = props;

  const slideoutRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const closeSlideout = (e: React.MouseEvent<HTMLDivElement>) => {
    if (open && closeOnOutsideClick && !slideoutRef?.current?.contains(e.target as Element)) {
      setOpen(false);
    }
  };

  const widthClass = getWidthClass(width);
  const containerClass = cn(styles["container"], {
    [styles["container--close"]]: !open,
    [styles["container--open"]]: open,
  });
  const slideoutClass = cn(styles["slideout"], widthClass, {
    [styles["slideout--close"]]: !open,
    [styles["slideout--open"]]: open,
  });

  const closeIconClass = cn(styles["icon"], styles["icon--close"]);

  return (
    <div className={containerClass} onClick={closeSlideout}>
      <div className={slideoutClass} ref={slideoutRef}>
        <div className={styles["slideout__header"]}>
          <span className={styles["slideout__header__title"]}>{title}</span>
          {showCloseButton && (
            <span className={closeIconClass} onClick={() => setOpen(false)}>
              <Icon type="xmark" size="xl" />
            </span>
          )}
        </div>
        <div className={styles["slideout__content"]} tabIndex={0}>
          {content}
        </div>
        {actions && <div className={styles["slideout__footer"]}>{actions}</div>}
      </div>
    </div>
  );
}

function getWidthClass(type: ISlideout["width"]) {
  switch (type) {
    case "large":
      return styles["slideout--large"];
    case "full":
      return styles["slideout--full"];
    case "medium":
    default:
      return styles["slideout--medium"];
  }
}
