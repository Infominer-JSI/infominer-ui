import { useState, useEffect } from "react";

interface IWindowSize {
  width?: number;
  height?: number;
}

export function useWindowSize() {
  // Initialize the state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // handle to call on window resize
    function handleResize() {
      // set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // add event listerer
    window.addEventListener("resize", handleResize);
    // call handler right away so state gets updated with initial window size
    handleResize();

    // remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
