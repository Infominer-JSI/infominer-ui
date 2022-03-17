// import modules
import { useState, useEffect } from "react";
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

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  const containerClass = cn(styles.container, {
    [styles.disabled]: disabled,
    [styles.inline]: inline,
  });
  const checkboxClass = cn(styles.checkbox, className, {
    [styles.active]: isChecked,
  });
  const labelClass = cn(styles.label, className);

  const onChangeInner = () =>
    !disabled
      ? () => {
          setIsChecked(!isChecked);
          onChange(!isChecked);
        }
      : () => {};

  return (
    <label className={containerClass}>
      <input type="checkbox" onChange={onChangeInner()} />
      <span className={checkboxClass} aria-hidden="true">
        <span className={styles.fill} />
      </span>
      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
}
