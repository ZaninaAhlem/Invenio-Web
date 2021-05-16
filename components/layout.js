import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.header}>
        <section className={styles.headerTop}>
          <div>
            <Image src="/logo.svg" alt="logo" width="24px" height="30px" />
            <p style={{ fontSize: 18, marginLeft: 20 }}>Invenio</p>
            <div className={styles.line}></div>
            <p style={{ fontSize: 18 }}>ADEA</p>
          </div>
          <div>
            <div className={styles.notifacations}>
              <a href="/.">
                <Image
                  src="/notification.svg"
                  alt="notification"
                  width="18px"
                  height="18px"
                />
                <p style={{ fontSize: 11, opacity: 0.7, marginLeft: 8 }}>
                  Notification
                </p>
              </a>
              <a href="/.">
                <Image
                  src="/message.svg"
                  alt="message"
                  width="18px"
                  height="18px"
                />
                <p style={{ fontSize: 11, opacity: 0.7, marginLeft: 8 }}>
                  Message
                </p>
              </a>
            </div>
            <div className={styles.line}></div>
            <p style={{ fontSize: 14, opacity: 0.8 }}>ADEA</p>
            <a href="/.">
              <Image
                src="/profileImage.png"
                alt="profile image"
                width="60px"
                height="60px"
              />
            </a>
          </div>
        </section>
        <section className={styles.headerBottom}>
          <ul>
            <li>
              <a href="./">
                <p>Mes formations</p>
              </a>
            </li>
          </ul>
        </section>
        <button className={styles.plus}>
          <Image src="/plus.svg" height="28px" width="28px" />
        </button>
      </div>
      {children}
    </>
  );
}
