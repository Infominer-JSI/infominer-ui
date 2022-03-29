// import modules
import React, { useState, useEffect, useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Toolbox from "./Toolbox";

import cn from "classnames";

// import grid defaults
import { responsiveBp, responsiveCp, responsiveCols, generateGrid } from "utils/grid";

// add the responsive react grid style
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./ResponsiveGrid.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IResponsiveGrid {
  layoutKey?: string;
  toolboxTitle?: string;
  toolboxItems?: { id: any; label: string }[];
  className?: string;
  children: React.ReactChild[];
}

interface IGridItem {
  x: number;
  y: number;
  w: any;
  h: any;
  minW: any;
  minH: any;
  i: string;
  static: boolean;
  label: string;
}

interface IGrid {
  [key: string]: IGridItem[];
}

interface IToolboxItem {
  id: string;
  label: string;
  active: boolean;
  grid?: { [key: string]: IGridItem };
}

//===============================================
// Define the component
//===============================================

// set the default keys for storing in local storage
const GRID_LS_KEY = "grid";
const TOOL_LS_KEY = "toolbox";

// create the responsive grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ResponsiveGrid(props: IResponsiveGrid) {
  const { layoutKey = "default", toolboxTitle, toolboxItems = [] } = props;

  // ============================================
  // Setup the responsive grid hooks
  // ============================================

  // defines how the components gets the default grid configuration
  const getDefaultGrid = useCallback(() => {
    const defaultGrid: IGrid = getFromLS(layoutKey, GRID_LS_KEY) ?? {};
    if (Object.keys(defaultGrid).length === 0) {
      // generate the default grid from scrach
      for (const bp in responsiveBp) {
        // set the breakpoints for the new grid layout
        defaultGrid[bp] = generateGrid(props.children, bp);
      }
    }
    return defaultGrid;
  }, [props.children, layoutKey]);

  // set the grid and toolbox
  const [grid, setGrid] = useState<IGrid>(getDefaultGrid());
  const [toolbox, setToolbox] = useState<IToolboxItem[]>(
    getFromLS(layoutKey, TOOL_LS_KEY) ?? toolboxItems.map((item) => ({ ...item, active: true })),
  );
  const [breakpoint, setBreakpoint] = useState("xl");

  // update on layout loading
  useEffect(() => {
    setGrid(getDefaultGrid());
  }, [getDefaultGrid]);

  // ============================================
  // Initialize the variables
  // ============================================

  // hides the associated grid elements
  function __onHideItem(item: IToolboxItem) {
    // get the grid items for all sizes available
    const gridItems: { [key: string]: IGridItem } = {};
    for (const bp in grid) {
      const gridItemIdx = grid[bp].map((item) => item.i).indexOf(item.id);
      if (gridItemIdx !== -1) {
        gridItems[bp] = grid[bp][gridItemIdx];
      }
    }
    // update the toolbox
    setToolbox((prevState) => {
      const idx = prevState.map((item) => item.id).indexOf(item.id);
      const updatedItem = {
        ...prevState[idx],
        active: false,
        // save the missing grid element specs
        grid: gridItems,
      };
      return [...prevState.slice(0, idx), updatedItem, ...prevState.slice(idx + 1)];
    });
    // update the grid values
    setGrid((prevState) => {
      const newState: { [key: string]: IGridItem[] } = {};
      for (const bp in prevState) {
        // remove the hidden grid elements
        newState[bp] = prevState[bp].filter((xitem) => xitem.i !== item.id);
      }
      return newState;
    });
  }

  // shows the associated grid elements
  function __onShowItem(item: IToolboxItem) {
    // get the hidden grid element specs
    const toolboxItem = toolbox.filter((xitem) => xitem.id === item.id);
    const gridItems: { [key: string]: IGridItem } = toolboxItem.length
      ? (toolboxItem[0].grid as { [key: string]: IGridItem })
      : {};
    // update the toolbox
    setToolbox((prevState) => {
      const idx = prevState.map((item) => item.id).indexOf(item.id);
      const updatedItem = {
        ...prevState[idx],
        active: true,
        grid: undefined,
      };
      return [...prevState.slice(0, idx), updatedItem, ...prevState.slice(idx + 1)];
    });
    // update the grid
    setGrid((prevState) => {
      const newState: { [key: string]: IGridItem[] } = {};
      for (const bp in prevState) {
        // add the hidden grid elements
        newState[bp] = [...prevState[bp], gridItems[bp]];
      }
      return newState;
    });
  }

  // handles the show/hide specification
  function onClickItem(item: IToolboxItem) {
    item.active ? __onHideItem(item) : __onShowItem(item);
  }

  // save the layout change in the browser's local storage
  function onLayoutChange(_layout: any, xlayouts: any) {
    saveToLS(layoutKey, GRID_LS_KEY, xlayouts);
    saveToLS(layoutKey, TOOL_LS_KEY, toolbox);
    setGrid(xlayouts);
  }

  // save the breakpoint when it changes
  function onBreakpointChange(bp: string) {
    setBreakpoint(bp);
  }

  // set the class name of the responsive layout
  const containerClass = cn(props.className);

  // ============================================
  // Visualize the component
  // ============================================
  return (
    <div className={containerClass}>
      {toolbox.length ? (
        <Toolbox title={toolboxTitle} items={toolbox} onClickItem={onClickItem} />
      ) : null}
      <ResponsiveGridLayout
        className="layout"
        onBreakpointChange={onBreakpointChange}
        containerPadding={responsiveCp}
        breakpoints={responsiveBp}
        cols={responsiveCols}
        layouts={grid}
        isBounded={true}
        margin={[16, 16]}
        rowHeight={76}
        resizeHandles={["se", "e", "s"]}
        onLayoutChange={onLayoutChange}>
        {grid[breakpoint].map((item: any) => (
          <div key={item.i}>
            <div className="box">{props.children[parseInt(item.i)]}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

function getFromLS(lsItemKey: string, layoutKey: string) {
  let ls: any = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(lsItemKey) as string) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[layoutKey];
}

function saveToLS(lsItemKey: string, layoutKey: string, value: any) {
  if (global.localStorage) {
    const item = JSON.parse(global.localStorage.getItem(lsItemKey) as string) || {};
    global.localStorage.setItem(
      lsItemKey,
      JSON.stringify({
        ...item,
        [layoutKey]: value,
      }),
    );
  }
}
