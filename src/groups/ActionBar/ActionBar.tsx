// import modules
import cn from "classnames";

// import components
import Action from "components/Action";

// import styles
import styles from "./ActionBar.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IActionBar {
  actions: {
    text: string;
    icon: "dashboard" | "table" | "compare";
    active: boolean;
    onClick: () => void;
  }[];
}

//===============================================
// Define the component
//===============================================

export default function ActionBar(props: IActionBar) {
  // get dataset information and set their state
  const { actions } = props;

  const actionbarClass = cn(styles["actionbar"]);

  return (
    <div className={actionbarClass}>
      {actions.map((action) => (
        <Action key={action.text} {...action} />
      ))}
    </div>
  );
}
