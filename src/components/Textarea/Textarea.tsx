// import modules
import React, { ChangeEvent, useState } from "react";
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import utilities
import makeHash from "utils/hashGenerator";

// import styles
import styles from "./Textarea.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface ITextarea {
  label?: string;
  input?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  validate?: (input: string) => string | null;
  onChange: (input: string) => void;
}

//===============================================
// Define the component
//===============================================

export default function Textarea(props: ITextarea) {
  const {
    label,
    placeholder = "Input description",
    rows = 4,
    disabled,
    onChange,
    validate,
  } = props;

  const [input, setInput] = useState(props.input ?? "");
  const [hash] = useState(makeHash(5));

  const onChangeInner = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    onChange(value);
  };

  // validate the input string
  const message = validate ? validate(input) : null;

  const containerClass = cn(styles["container"], {
    [styles["container--disabled"]]: disabled,
  });

  const textareaBlockClass = cn(styles["textarea-block"], {
    [styles["textarea-block--warning"]]: message,
  });

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={hash} className={styles["textarea__label"]}>
          {label}
        </label>
      )}
      <div className={textareaBlockClass} id={hash}>
        <textarea
          className={styles["textarea"]}
          value={input}
          placeholder={placeholder}
          onChange={!disabled ? onChangeInner : undefined}
          disabled={disabled}
          rows={rows}
        />
        {/* warning exclamation */}
        {message && <Icon type="exclamation" size="lg" className={styles["icon"]} />}
      </div>
      {/* warning message */}
      {message && <span className={styles["message"]}>{message}</span>}
    </div>
  );
}
