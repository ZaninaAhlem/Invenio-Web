import { useState } from "react";
import Image from "next/image";

import styles from "../styles/FormField.module.css";

export default function FormField({ changeHandler }) {
  const [field, setField] = useState("");
  return (
    <div className={styles.inputField}>
      <input
        placeholder="Label"
        onChange={(e) => {
          setField({ ...field, label: e.target.value });
        }}
        onBlur={() => changeHandler(field)}
      />
    </div>
  );
}
