// import modules
import { ChangeEvent, useState } from "react";
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./SearchBar.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface ISearchBar {
  size?: "medium" | "large";
  input?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (input: string) => void;
}

//===============================================
// Define the component
//===============================================

function clickableIcon(
  iconType: "magnifying-glass" | "xmark",
  size: "lg",
  className?: string,
  onClick?: () => void,
) {
  return (
    <span className={className} onClick={onClick}>
      <Icon type={iconType} size={size} />
    </span>
  );
}

export default function SearchBar(props: ISearchBar) {
  const { placeholder = "Search", size = "medium", disabled, onChange } = props;

  const [input, setInput] = useState(props.input ?? "");

  const onChangeInner = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onChange(value);
  };

  const resetInput = () => {
    setInput("");
    onChange("");
  };

  const sizeClass = getSizeClass(size);
  const searchbarClass = cn(styles["searchbar"], sizeClass, {
    [styles["searchbar--disabled"]]: disabled,
  });
  const searchIconClass = cn(styles["icon"], styles["icon--search"]);
  const clearIconClass = cn(styles["icon"], styles["icon--clear"]);

  // create the icons
  const SearchIcon = clickableIcon("magnifying-glass", "lg", searchIconClass);
  const ClearIcon = clickableIcon("xmark", "lg", clearIconClass, resetInput);

  return (
    <div className={searchbarClass}>
      <input
        className={styles["input"]}
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={!disabled ? onChangeInner : undefined}
        disabled={disabled}
        aria-label="Search"
      />
      {SearchIcon}
      {input && ClearIcon}
    </div>
  );
}

function getSizeClass(type: ISearchBar["size"]) {
  switch (type) {
    case "large":
      return styles["size--large"];
    case "medium":
    default:
      return styles["size--medium"];
  }
}
