import React, { useState, useEffect } from "react";

interface IContainerSize {
  width?: number;
  height?: number;
}

export function useContainerSize(reference: React.RefObject<any>, ms = 200) {
  // set the states
  const [containerSize, setContainerSize] = useState<IContainerSize>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setContainerSize({
        width: reference?.current?.offsetWidth,
        height: reference?.current?.offsetHeight,
      });
    }, ms);
    // Remove event listener on cleanup
    return () => clearInterval(interval);
  }, [reference, ms]);

  return containerSize;
}
