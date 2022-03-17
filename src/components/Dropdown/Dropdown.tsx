// import modules
import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import cn from "classnames";

// import components
import Button from "components/Button";
import Checkbox from "components/Checkbox";

// import styles
import styles from "./Dropdown.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IDropdown {
  buttonText: string;
  disabled?: boolean;
  className?: string;
  multiselect?: boolean;
  listPosition?: "left" | "right";
  itemType?: "list" | "checkbox";
  items: { id: string; label: string; checked?: boolean }[];
  onClick?: (state: any) => void;
}

type IOnItemClick = (id: IDropdown["items"][0]["id"], state: boolean) => void;

//===============================================
// Define the component
//===============================================

function createListItem(
  item: IDropdown["items"][0],
  itemType: IDropdown["itemType"],
  onItemClick: IOnItemClick,
) {
  switch (itemType) {
    case "checkbox":
      return (
        <Checkbox
          key={item.id}
          label={item.label}
          checked={item.checked}
          className={styles["item-text"]}
          inline={false}
          onChange={(state: boolean) => onItemClick(item.id, state)}
        />
      );

    case "list":
      const itemClass = cn(styles.item, styles["item-text"], {
        [styles.selected]: itemType === "list" && item.checked,
      });
      return (
        <div key={item.id} className={itemClass} onClick={() => onItemClick(item.id, true)}>
          {item.label}
        </div>
      );
    default:
      return null;
  }
}

export default function Dropdown(props: IDropdown) {
  // get dataset information and set their state
  const {
    buttonText,
    className,
    disabled,
    itemType = "list",
    listPosition = "left",
    items,
    onClick,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [internalItems, setInternalItems] = useState(
    items.map((item) => ({ checked: false, ...item })),
  );

  useEffect(() => {
    function handleClickOutsidd(e: MouseEvent) {
      if (!containerRef?.current?.contains(e.target as Element)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsidd);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidd);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [disabled]);

  const onItemClick: IOnItemClick = (id, state) => {
    setInternalItems((prevState) => {
      const idx = prevState.map((item) => item.id).indexOf(id);
      if (itemType === "list") {
        prevState.forEach((item) => (item.checked = false));
      }
      const newState = [
        ...prevState.slice(0, idx),
        { ...prevState[idx], checked: state },
        ...prevState.slice(idx + 1),
      ];
      // click with the new state of values
      onClick && onClick(newState);
      // save the new state
      return newState;
    });

    if (itemType === "list") {
      // close the list
      setIsOpen(false);
    }
  };

  const numberOfSelected =
    itemType === "checkbox" ? internalItems.filter((item) => item.checked).length : null;

  const containerClass = cn(styles.container, className, {
    [styles.disabled]: disabled,
    [styles.active]: isOpen,
  });

  const listClass = cn(styles.items, styles[`position-${listPosition}`], {
    [styles.checkbox]: itemType === "checkbox",
  });

  return (
    <div className={containerClass} ref={containerRef}>
      <Button
        type="outline"
        variant="base"
        icon="angle-down"
        iconPosition="right"
        number={numberOfSelected}
        onClick={!disabled ? () => setIsOpen(!isOpen) : undefined}>
        {buttonText}
      </Button>
      {isOpen ? (
        <div className={listClass}>
          {internalItems.map((item) => createListItem(item, itemType, onItemClick))}
        </div>
      ) : null}
    </div>
  );
}
