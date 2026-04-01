"use client";
// Marks this as a Client Component (needed for hooks and DOM interaction)

import { useState, useEffect, useCallback } from "react";
import styles from "./Toast.module.scss";

/** 
 * Global function reference
 * -------------------------
 * This variable holds a reference to the internal `show` function
 * from the Toast component.
*/
let showToastFn: ((message: string) => void) | null = null;

/**
 * Public toast API
 * ----------------
 * Call this function anywhere to display a toast message.
 */
export function toast(message: string) {
  // Call the registered function if available
  showToastFn?.(message);
}

export default function Toast() {
 
    //Stores the current toast message
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  useEffect(() => {
    showToastFn = show;

    return () => {
      showToastFn = null;
    };
  }, [show]);


  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => setVisible(false), 2000);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      {/* Overlay: usually for positioning (center / top / fixed) */}

      <div className={styles.toast}>
        {/* Toast message container */}
        {message}
      </div>
    </div>
  );
}