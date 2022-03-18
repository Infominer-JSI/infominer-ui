// import modules
import cn from "classnames";

// import components
import Icon from "components/Icon";

// import styles
import styles from "./Footer.module.scss";

//===============================================
// Define the state interfaces
//===============================================

//===============================================
// Define the component
//===============================================

export default function Footer() {
  // get dataset information and set their state

  const footerClass = cn(styles["footer"]);
  return (
    <div className={footerClass}>
      <span></span>
      <span className={styles["copyright"]}>
        <Icon type="copyright" size="md" />
        2018-2021 AILAB JSI. All rights reserved.
      </span>
      <span>
        <a href="https://github.com/Infominer-JSI" rel="noreferrer" target="_blank">
          <Icon type="github" size="xl" />
        </a>
      </span>
    </div>
  );
}
