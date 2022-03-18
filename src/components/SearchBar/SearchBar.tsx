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
  input?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (input: string) => void;
}

//===============================================
// Define the component
//===============================================

function iconContainer(
  iconType: "magnifying-glass" | "xmark",
  className: string,
  onClick?: () => void,
) {
  return (
    <span className={className} onClick={onClick}>
      <Icon type={iconType} size="lg" />
    </span>
  );
}

export default function SearchBar(props: ISearchBar) {
  const { placeholder = "Search", disabled, onChange } = props;

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

  const searchbarClass = cn(styles["searchbar"], {
    [styles["searchbar--disabled"]]: disabled,
  });
  const searchIconClass = cn(styles["icon"], styles["icon--search"]);
  const clearIconClass = cn(styles["icon"], styles["icon--clear"]);

  // create the icons
  const SearchIcon = iconContainer("magnifying-glass", searchIconClass);
  const ClearIcon = iconContainer("xmark", clearIconClass, resetInput);

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
