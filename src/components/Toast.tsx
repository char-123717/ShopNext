"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Toast.module.scss";

let showToastFn: ((message: string) => void) | null = null;

export function toast(message: string) {
  showToastFn?.(message);
}

export default function Toast() {
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
      <div className={styles.toast}>{message}</div>
    </div>
  );
}
