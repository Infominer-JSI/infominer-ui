import { useState, useEffect } from "react";

export function useDocumentTitle(title: string) {
  const [docTitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  return [docTitle, setDocTitle];
}
