import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card(props) {
  return (
    <div className={styles.card}>
      <Image src={props.post.image} height="" width="" />
      <div className={styles.vector}>
        <Image src="/vector.svg" height="45px" width="100px" />
        <button className={styles.settingsIcon}>
          <Image src="/settings.svg" height="15px" width="15px" />
        </button>
      </div>
      <div className={styles.details}>
        <p style={{ fontSize: 13, fontFamily: 600, color: "#2A2B30" }}>
          {props.post.title}
        </p>
        <p style={{ fontSize: 11, color: "#6a6d7d" }}>
          {props.post.description}
        </p>
      </div>
    </div>
  );
}
