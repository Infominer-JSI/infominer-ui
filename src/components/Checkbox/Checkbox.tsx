// import modules
import { useState } from "react";
import cn from "classnames";

// import styles
import styles from "./Checkbox.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface ICheckbox {
  label?: string;
  inline?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (state: boolean) => void;
}

//===============================================
// Define the component
//===============================================

export default function Checkbox(props: ICheckbox) {
  // get dataset information and set their state
  const { label, inline = true, checked, disabled = false, className, onChange } = props;

  const [isChecked, setIsChecked] = useState(checked ?? false);

  const containerStyle = cn(styles.container, {
    [styles.disabled]: disabled,
    [styles.inline]: inline,
  });
  const checkboxStyle = cn(styles.checkbox, className, {
    [styles.active]: isChecked,
  });

  const onChangeInner = () =>
    !disabled
      ? () => {
          setIsChecked(!isChecked);
          onChange(!isChecked);
        }
      : () => {};

  return (
    <label className={containerStyle}>
      <input type="checkbox" onChange={onChangeInner()} />
      <span className={checkboxStyle} aria-hidden="true">
        <span className={styles.fill} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
