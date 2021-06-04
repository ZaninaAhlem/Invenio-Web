import Image from "next/image";

import styles from "../styles/Formateur.module.css";

export default function InformationCard({ item }) {
  return (
    <div className={styles.card}>
      <div>
        <Image src={item.avatar} width="50" height="50" />
      </div>
      <h5>{item.name}</h5>
    </div>
  );
}
