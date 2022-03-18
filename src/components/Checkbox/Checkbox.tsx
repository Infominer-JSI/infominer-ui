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

  const onChangeInner = () =>
    !disabled
      ? () => {
          setIsChecked(!isChecked);
          onChange(!isChecked);
        }
      : () => {};

  const containerClass = cn(styles.container, {
    [styles["container--disabled"]]: disabled,
    [styles["container--inline"]]: inline,
  });
  const checkboxClass = cn(styles["checkbox"], className, {
    [styles["checkbox--active"]]: isChecked,
  });
  const labelClass = cn(styles["checkbox__label"], className);

  return (
    <label className={containerClass}>
      <input type="checkbox" onChange={onChangeInner()} />
      <span className={checkboxClass} aria-hidden="true">
        <span className={styles["checkbox__fill"]} />
      </span>
      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
}
