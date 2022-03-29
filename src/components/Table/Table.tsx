// import modules
import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";

import TColumn from "components/Table/Column";
import Checkbox from "components/Checkbox";

// import styles
import styles from "./Table.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IColumn {
  id?: number;
  dataKey: string;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
  width?: number;
  dataType?: "text" | "number" | "class";
  headerFormatter?: (label: any) => string;
  dataFormatter?: (data: any) => React.ReactNode;
}

interface IData {
  id?: number;
  [key: string]: any;
}

interface ISortedBy {
  columnId?: number;
  sort?: "none" | "asc" | "desc";
}

interface ITable {
  type?: "compact" | "regular";
  title?: string;
  columns: IColumn[];
  data: IData[];
  headActions?: React.ReactNode;
  footActions?: React.ReactNode;
  limit?: number;
  defaultSortedBy?: ISortedBy;
  showRowCheckbox?: boolean;
  isLoading?: boolean;
  onRowClick?: (rowId: number) => void;
  onCheckboxFunc?: ({ action, rowId }: { action: string; rowId: number }) => void;
  className?: string;
}

//===============================================
// Define the internal states
//===============================================

interface IInternalCol extends IColumn {
  __id: number;
  __sortable: boolean;
  __style: { [key: string]: any };
}

interface IInternalRow extends IData {
  __id: number;
  __selected: boolean;
  __onClick: () => void;
}

//===============================================
// Define the outer helper functions
//===============================================

function defaultSortFunc(a: number | string | Date, b: number | string | Date) {
  return a > b ? 1 : a < b ? -1 : 0;
}

//===============================================
// Define the component
//===============================================

export default function Table(props: ITable) {
  // get dataset information and set their state
  const {
    type = "regular",
    title,
    columns,
    data,
    headActions,
    footActions,
    limit,
    defaultSortedBy,
    showRowCheckbox,
    isLoading,
    onRowClick,
    onCheckboxFunc,
    className,
  } = props;

  const [internalColumns, setInternalColumns] = useState<IInternalCol[]>([]);
  const [internalRows, setInternalRows] = useState<IInternalRow[]>([]);

  const [sortedBy, setSortedBy] = useState<ISortedBy>(defaultSortedBy ?? {});

  //===============================================
  // Define the helper function
  //===============================================

  function onColumnClick(columnId: number) {
    const column = internalColumns.filter((column) => column.__id === columnId)[0];
    if (sortedBy?.columnId !== column.__id) {
      setSortedBy({ columnId, sort: "asc" });
    } else if (sortedBy?.columnId === column.__id && sortedBy?.sort === "asc") {
      setSortedBy({ columnId, sort: "desc" });
    } else if (sortedBy?.columnId === column.__id && sortedBy?.sort === "desc") {
      setSortedBy({ columnId, sort: "none" });
    } else {
      setSortedBy({ columnId, sort: "asc" });
    }
  }

  function onCheckboxClick(rowId: number, checkboxState: boolean) {
    const rowIndex = internalRows.findIndex((row) => row.__id === rowId);
    setInternalRows((prevState) => [
      ...prevState.slice(0, rowIndex),
      { ...prevState[rowIndex], __selected: checkboxState },
      ...prevState.slice(rowIndex + 1),
    ]);
    onCheckboxFunc &&
      onCheckboxFunc({
        action: checkboxState ? "row-selected" : "row-unselected",
        rowId,
      });
  }

  //===============================================
  // Define the hooks
  //===============================================

  // prepare internal columns and rows
  const generateInternalColumnsAndRows = useCallback(() => {
    function prepareColumns(columns: IColumn[]) {
      return columns.map((column, idx) => {
        const __style = {
          width: column.width ? `${column.width}px` : null,
        };
        return {
          ...column,
          __id: idx,
          __style,
          __sortable: column.sortable ?? true,
        };
      });
    }
    function prepareRows(data: IData[]) {
      return data.map((d, idx) => {
        const __id = d.id || idx;
        return {
          ...d,
          __id,
          __selected: false,
          __onClick: onRowClick ? () => onRowClick(__id) : undefined,
        };
      });
    }
    // get the columns and rows
    let cols = prepareColumns([...(columns || [])]);
    let rows = prepareRows([...(data || [])]);

    return [cols, rows];
  }, [columns, data, onRowClick]);

  useEffect(() => {
    const [cols, rows] = generateInternalColumnsAndRows();
    setInternalColumns(cols as IInternalCol[]);
    setInternalRows(rows as IInternalRow[]);
  }, [generateInternalColumnsAndRows]);

  useEffect(() => {
    // get the column used to sort the rows by
    const columns = internalColumns.filter((clm) => clm.__id === sortedBy?.columnId);

    if (!columns.length) {
      return;
    }
    const { dataKey } = columns[0];
    setInternalRows((prevState) => {
      const newInternalRows = [...prevState];
      if (dataKey && sortedBy?.sort === "none") {
        newInternalRows.sort((a, b) => defaultSortFunc(a.__id, b.__id));
      } else if (dataKey && sortedBy?.sort === "asc") {
        newInternalRows.sort((a, b) => defaultSortFunc(a[dataKey], b[dataKey]));
      } else if (dataKey && sortedBy?.sort === "desc") {
        newInternalRows.sort((a, b) => defaultSortFunc(b[dataKey], a[dataKey]));
      }
      return newInternalRows;
    });
  }, [internalColumns, sortedBy]);

  //===============================================
  // Construct the component
  //===============================================

  /**
   * Generates the row data cell.
   * @param row - The row data.
   * @param column - The column data.
   * @returns The generated row data cell.
   */
  function generateDataCell(row: IInternalRow, column: IInternalCol) {
    // format the row/column value
    const { __id, dataKey, dataFormatter } = column;
    let value = dataFormatter ? dataFormatter(row[dataKey]) : row[dataKey];
    return (
      <td key={__id} className={styles["row__data"]}>
        {value}
      </td>
    );
  }

  /**
   * Generates the header data cell.
   * @param column - The column data.
   * @returns The generated header data cell.
   */
  function generateHeaderCell(column: IInternalCol) {
    const { label, __id, __style, __sortable, dataType, headerFormatter } = column;

    // formats the label
    const formattedLabel = headerFormatter ? headerFormatter(label) : label;

    // construct the column class
    const columnType = dataType ? dataType : "text";
    const columnClass = cn(styles["column"], styles[`column--${columnType}`]);

    return (
      <th key={__id} style={__style} className={columnClass}>
        <TColumn
          text={formattedLabel}
          sort={sortedBy?.columnId === __id ? sortedBy?.sort : "none"}
          onClick={__sortable ? onColumnClick.bind(null, __id) : undefined}
          disabled={isLoading}
        />
      </th>
    );
  }

  const containerClass = cn(styles["container"], className, {
    [styles["container--compact"]]: type === "compact",
    [styles["container--loading"]]: isLoading,
  });

  // assign the button style
  return (
    <div className={containerClass}>
      {type !== "compact" && (
        <div className={styles["container__header"]}>
          <div className={styles["title"]}>{title}</div>
          <div className={styles["actions"]}>{headActions}</div>
        </div>
      )}
      <div className={styles["container__content"]}>
        <table className={styles["table"]}>
          <thead className={styles["table__head"]}>
            <tr>
              {showRowCheckbox && (
                <th className={cn(styles["column"], styles["column--checkbox"])}></th>
              )}
              {internalColumns.map((column) => generateHeaderCell(column))}
            </tr>
          </thead>
          <tbody className={styles["table__body"]}>
            {internalRows.slice(0, limit).map((row) => {
              const rowClass = cn(styles["row"], {
                [styles["row--selectable"]]: row.__onClick,
                [styles["row--selected"]]: row.__selected,
              });
              return (
                <tr
                  key={row.__id}
                  className={rowClass}
                  onClick={!isLoading && row.__onClick ? row.__onClick : undefined}>
                  {showRowCheckbox && (
                    <td className={cn(styles["row__data"], styles["row__data--checkbox"])}>
                      <Checkbox
                        inline={true}
                        checked={row.__selected}
                        onChange={(state) => onCheckboxClick(row.__id, state)}
                        disabled={isLoading}
                      />
                    </td>
                  )}
                  {internalColumns.map((column) => generateDataCell(row, column))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {type !== "compact" && <div className={styles["container__footer"]}>{footActions}</div>}
    </div>
  );
}
