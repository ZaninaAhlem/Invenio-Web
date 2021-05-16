import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card(props) {
  return (
    <div className={styles.card}>
      <Image src={props.post.image} height="280" width="375" />
      <div className={styles.vector}>
        <Image src="/vector.svg" height="58px" width="140px" />
        <button className={styles.settingsIcon}>
          <Image src="/settings.svg" height="16" width="16" />
        </button>
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>{props.post.title}</h1>
        <p className={styles.description}>{props.post.description}</p>
      </div>
    </div>
  );
}
