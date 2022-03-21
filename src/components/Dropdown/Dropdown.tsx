// import modules
import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";

// import components
import Button from "components/Button";
import Checkbox from "components/Checkbox";

// import styles
import styles from "./Dropdown.module.scss";

//===============================================
// Define the state interfaces
//===============================================

type TItem = { id: string; label: string; checked?: boolean; className?: string };
type TAction = { id: string; label: string; className?: string; onClick: () => void };

interface IDropdown {
  placeholder: React.ReactNode;
  buttonType?: "outline" | "borderless";
  dynamicPlaceholder?: boolean;
  disabled?: boolean;
  className?: string;
  listPosition?: "left" | "right";
  dropdownTitle?: string;
  items: TItem[];
  actions?: TAction[];
  listType?: "list" | "checkbox";
  onClick?: (state: any) => void;
}

type IOnItemClick = (id: TItem["id"], state: boolean) => void;

//===============================================
// Define the helper functions
//===============================================

function createListItem(item: TItem, itemType: IDropdown["listType"], onItemClick: IOnItemClick) {
  switch (itemType) {
    case "checkbox":
      return (
        <Checkbox
          key={item.id}
          label={item.label}
          checked={item.checked}
          className={styles["list-item__text"]}
          inline={false}
          onChange={(state: boolean) => onItemClick(item.id, state)}
        />
      );

    case "list":
      const itemClass = cn(styles["list-item"], styles["list-item__text"], item.className, {
        [styles["list-item--selected"]]: itemType === "list" && item.checked,
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

function createActionItem(item: TAction, itemType: IDropdown["listType"]) {
  const actionClass = cn(styles["list-item"], styles["list-item__text"], item.className);
  return (
    <div key={item.id} className={actionClass} onClick={item.onClick}>
      {item.label}
    </div>
  );
}

//===============================================
// Define the component
//===============================================

export default function Dropdown(props: IDropdown) {
  // get dataset information and set their state
  const {
    placeholder,
    buttonType = "outline",
    dynamicPlaceholder = true,
    disabled = false,
    dropdownTitle,
    listType = "list",
    listPosition = "left",
    items,
    actions,
    onClick,
    className,
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

  // get the button label
  let buttonLabel: string | null = null;
  if (dynamicPlaceholder) {
    // generate the button label
    const checkedItems = internalItems.filter((item) => item.checked).map((item) => item.label);
    buttonLabel =
      checkedItems.length < 3
        ? checkedItems.join(", ")
        : `${checkedItems.slice(0, 2).join(", ")},...`;
  }

  const numberOfSelected =
    listType === "checkbox" ? internalItems.filter((item) => item.checked).length : null;

  const onItemClick: IOnItemClick = (id, state) => {
    setInternalItems((prevState) => {
      const idx = prevState.map((item) => item.id).indexOf(id);
      if (listType === "list") {
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

    if (listType === "list") {
      // close the list
      setIsOpen(false);
    }
  };

  const containerClass = cn(styles.container, className, {
    [styles["container--active"]]: isOpen,
  });
  const dropdownClass = cn(styles.dropdown, styles[`dropdown--position--${listPosition}`]);
  const listItemsClass = cn(styles["list-items"], {
    [styles["list-type--checkbox"]]: listType === "checkbox",
  });

  const listActionClass = cn(styles["list-actions"]);

  return (
    <div className={containerClass} ref={containerRef}>
      <Button
        className={styles.button}
        type={buttonType}
        variant="base"
        icon="angle-down"
        iconPosition="right"
        disabled={disabled}
        number={numberOfSelected}
        onClick={() => setIsOpen(!isOpen)}>
        {buttonLabel ? buttonLabel : placeholder}
      </Button>
      {isOpen ? (
        <div className={dropdownClass}>
          {dropdownTitle && <span className={styles["dropdown__title"]}>{dropdownTitle}</span>}
          <div className={listItemsClass}>
            {internalItems.map((item) => createListItem(item, listType, onItemClick))}
          </div>
          {actions && (
            <div className={listActionClass}>
              {actions.map((item) => createActionItem(item, listType))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
