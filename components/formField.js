import { useState } from "react";
import styles from "../styles/FormField.module.css";

export default function FormField({ onChange }) {
  const [field, setField] = useState({
    label: "",
    type: "",
  });
  return (
    <div className={styles.inputField}>
      <input
        onChange={(e) => {
          console.log(onChange);
          setField({ ...field, label: e.target.value });
          // onChange(field);
        }}
      />
      <input
        onChange={(e) => {
          setField({ ...field, label: e.target.value });
          // onChange(field);
        }}
      />
    </div>
  );
}
