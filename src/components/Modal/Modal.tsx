// import modules
import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";

// import components
import IconButton from "components/IconButton";

// import styles
import styles from "./Modal.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IModal {
  isOpen: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

//===============================================
// Define the component
//===============================================

export default function Modal(props: IModal) {
  const {
    isOpen = false,
    showCloseButton = true,
    closeOnOutsideClick = false,
    title,
    content,
    actions,
  } = props;

  const slideoutRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (open && closeOnOutsideClick && !slideoutRef?.current?.contains(e.target as Element)) {
      setOpen(false);
    }
  };

  const containerClass = cn(styles["container"], {
    [styles["container--close"]]: !open,
    [styles["container--open"]]: open,
  });
  const slideoutClass = cn(styles["modal"], styles["modal--medium"], {
    [styles["modal--close"]]: !open,
    [styles["modal--open"]]: open,
  });

  return (
    <div className={containerClass} onClick={closeModal}>
      <div className={slideoutClass} ref={slideoutRef}>
        <div className={styles["modal__header"]}>
          <span className={styles["modal__header__title"]}>{title}</span>
          {showCloseButton && (
            <IconButton
              icon="xmark"
              onClick={() => setOpen(false)}
              variant="inactive"
              type="outline"
              size="small"
            />
          )}
        </div>
        <div className={styles["modal__content"]} tabIndex={0}>
          {content}
        </div>
        {actions && <div className={styles["modal__footer"]}>{actions}</div>}
      </div>
    </div>
  );
}
