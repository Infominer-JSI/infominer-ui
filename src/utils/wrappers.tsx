import React from "react";
import Pill from "components/Pill";

// get the component props
type IPill = React.ComponentProps<typeof Pill>;

/**
 * Formats the class value with a given pill.
 * @param value - The value to be formated.
 * @returns The formatted number.
 */
export function wrapperPill(value: any, status: IPill["status"] = "highlight") {
  if (!value) return value;
  // get the number that will be used to format
  return (
    <Pill type="block" status={status}>
      {value}
    </Pill>
  );
}
