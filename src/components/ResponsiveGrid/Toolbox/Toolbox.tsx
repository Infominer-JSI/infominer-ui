// import modules
import React from "react";

// import components
import ToolboxItem from "./ToolboxItem";

// import styles
import styles from "./Toolbox.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IToolbox {
  title?: string;
  items: { id: string; label: string; active: boolean; grid?: { [key: string]: any } }[];
  onClickItem?: (item: IToolbox["items"][0]) => void;
}

//===============================================
// Define the component
//===============================================

export default function Toolbox(props: IToolbox) {
  const { title, items, onClickItem } = props;

  return (
    <div className={styles["toolbox"]}>
      {title && <div className={styles["toolbox__title"]}>{title}</div>}
      <div className={styles["toolbox__items"]}>
        {items.map((item: any) => (
          <ToolboxItem key={item.id} item={item} onClickItem={onClickItem} />
        ))}
      </div>
    </div>
  );
}
