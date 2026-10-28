import { useState, useEffect } from "react";

function useNotification() {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  function showNotification(message) {
    setNotification(message);
  }

  return { notification, showNotification };
}

export default useNotification;