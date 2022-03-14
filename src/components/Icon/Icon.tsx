// import modules
import cn from "classnames";

// import styles and icons
import styles from "./Icon.module.scss";

import { ReactComponent as AngleDown } from "assets/icons/angle-down.svg";
import { ReactComponent as AngleLeft } from "assets/icons/angle-left.svg";
import { ReactComponent as AngleRight } from "assets/icons/angle-right.svg";
import { ReactComponent as AngleUp } from "assets/icons/angle-up.svg";
import { ReactComponent as Bars } from "assets/icons/bars.svg";
import { ReactComponent as Bell } from "assets/icons/bell.svg";
import { ReactComponent as Calendar } from "assets/icons/calendar.svg";
import { ReactComponent as ChartArea } from "assets/icons/chart-area.svg";
import { ReactComponent as ChartColumn } from "assets/icons/chart-column.svg";
import { ReactComponent as Check } from "assets/icons/check.svg";
import { ReactComponent as Copyright } from "assets/icons/copyright.svg";
import { ReactComponent as Database } from "assets/icons/database.svg";
import { ReactComponent as Download } from "assets/icons/download.svg";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as Exclamation } from "assets/icons/exclamation.svg";
import { ReactComponent as External } from "assets/icons/external.svg";
import { ReactComponent as Filter } from "assets/icons/filter.svg";
import { ReactComponent as FloppyDisk } from "assets/icons/floppy-disk.svg";
import { ReactComponent as Folder } from "assets/icons/folder.svg";
import { ReactComponent as Gauge } from "assets/icons/gauge.svg";
import { ReactComponent as Github } from "assets/icons/github.svg";
import { ReactComponent as GripVertical } from "assets/icons/grip-vertical.svg";
import { ReactComponent as Hashtag } from "assets/icons/hashtag.svg";
import { ReactComponent as LessThanEqual } from "assets/icons/less-than-equal.svg";
import { ReactComponent as MagnifyingGlass } from "assets/icons/magnifying-glass.svg";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { ReactComponent as Sort } from "assets/icons/sort.svg";
import { ReactComponent as Star } from "assets/icons/star.svg";
import { ReactComponent as SquarePollHorizontal } from "assets/icons/square-poll-horizontal.svg";
import { ReactComponent as Table } from "assets/icons/table.svg";
import { ReactComponent as TrashCan } from "assets/icons/trash-can.svg";
import { ReactComponent as XMark } from "assets/icons/xmark.svg";

//===============================================
// Define the state interfaces
//===============================================

interface IIcon {
  type:
    | "angle-down"
    | "angle-left"
    | "angle-right"
    | "angle-up"
    | "bars"
    | "bell"
    | "calendar"
    | "chart-area"
    | "chart-column"
    | "check"
    | "copyright"
    | "database"
    | "download"
    | "edit"
    | "exclamation"
    | "external"
    | "filter"
    | "floppy-disk"
    | "folder"
    | "gauge"
    | "github"
    | "grip-vertical"
    | "hashtag"
    | "less-than-equal"
    | "magnifying-glass"
    | "plus"
    | "sort"
    | "star"
    | "square-poll"
    | "table"
    | "trash-can"
    | "xmark";
  size?: "tiny" | "xs" | "sm" | "base" | "md" | "lg" | "xl";
  className?: string;
}

//===============================================
// Define the component
//===============================================

export default function Icon(props: IIcon) {
  // get dataset information and set their state
  const { size = "base", type, className } = props;

  // get the icon to be displayed
  const ReactIcon = getIcon(type);

  const iconClass = cn(styles.default, getSize(size), className);
  return ReactIcon && <ReactIcon className={iconClass} />;
}

//===============================================
// Define the helper functions
//===============================================

function getIcon(type: IIcon["type"]) {
  switch (type) {
    case "angle-down":
      return AngleDown;
    case "angle-left":
      return AngleLeft;
    case "angle-right":
      return AngleRight;
    case "angle-up":
      return AngleUp;
    case "bars":
      return Bars;
    case "bell":
      return Bell;
    case "calendar":
      return Calendar;
    case "chart-area":
      return ChartArea;
    case "chart-column":
      return ChartColumn;
    case "check":
      return Check;
    case "copyright":
      return Copyright;
    case "database":
      return Database;
    case "download":
      return Download;
    case "edit":
      return Edit;
    case "exclamation":
      return Exclamation;
    case "external":
      return External;
    case "filter":
      return Filter;
    case "floppy-disk":
      return FloppyDisk;
    case "folder":
      return Folder;
    case "gauge":
      return Gauge;
    case "github":
      return Github;
    case "grip-vertical":
      return GripVertical;
    case "hashtag":
      return Hashtag;
    case "less-than-equal":
      return LessThanEqual;
    case "magnifying-glass":
      return MagnifyingGlass;
    case "plus":
      return Plus;
    case "sort":
      return Sort;
    case "star":
      return Star;
    case "square-poll":
      return SquarePollHorizontal;
    case "table":
      return Table;
    case "trash-can":
      return TrashCan;
    case "xmark":
      return XMark;
    default:
      return null;
  }
}

function getSize(size: IIcon["size"]) {
  return size && styles[size];
}
