// import modules
import React, { ChangeEvent, useState } from "react";
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import utilities
import makeHash from "utils/hashGenerator";

// import styles
import styles from "./Input.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IInput {
  label?: string;
  input?: string;
  disabled?: boolean;
  placeholder?: string;
  validate?: (input: string) => string | null;
  onChange: (input: string) => void;
}

//===============================================
// Define the component
//===============================================

export default function Input(props: IInput) {
  const { label, placeholder = "Search", disabled, onChange, validate } = props;

  const [input, setInput] = useState(props.input ?? "");
  const [hash] = useState(makeHash(5));

  const onChangeInner = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onChange(value);
  };

  // validate the input string
  const message = validate ? validate(input) : null;

  const containerStyle = cn(styles.container, {
    [styles.disabled]: disabled,
  });

  const inputBlockStyle = cn(styles["input-block"], {
    [styles.warning]: message,
  });

  return (
    <div className={containerStyle}>
      {label && (
        <label htmlFor={hash} className={styles.label}>
          {label}
        </label>
      )}
      <div className={inputBlockStyle} id={hash}>
        <input
          className={styles.input}
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={!disabled ? onChangeInner : () => {}}
          disabled={disabled}
        />
        {/* warning exclamation */}
        {message && <Icon type="exclamation" size="lg" className={styles.icon} />}
      </div>
      {/* warning message */}
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
}
