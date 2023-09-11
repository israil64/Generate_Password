import { useCallback } from "react";
// copyPasswordClipBoard;
const copyPasswordClipBoard = useCallback(() => {
  window.navigator.clipboard.writeText(password);
}, [password]);

export default copyPasswordClipBoard;
