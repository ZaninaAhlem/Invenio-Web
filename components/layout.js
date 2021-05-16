import Image from "next/image";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.header}>
        <section className={styles.headerTop}>
          <div className={styles.leftSection}>
            <Image src="/logo.svg" alt="logo" width="24px" height="30px" />
            <h1 className={styles.appName}>Invenio</h1>
            <hr className={styles.line} />
            <p className={styles.userName}>ADEA</p>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.actions}>
              <a href="/.">
                <Image
                  src="/notification.svg"
                  alt="notification"
                  width="18px"
                  height="18px"
                />
                <label className={styles.navAction}>Notification</label>
              </a>

              <a href="/.">
                <Image
                  src="/message.svg"
                  alt="message"
                  width="18px"
                  height="18px"
                />
                <label className={styles.navAction}>Message</label>
              </a>
            </div>

            <hr className={styles.line} />
            <a href="/." className={styles.profile}>
              <p className={styles.user}>ADEA</p>
              <Image
                src="/profileImage.png"
                alt="profile image"
                width="30"
                height="30"
                objectFit="cover"
              />
            </a>
          </div>
        </section>

        <section className={styles.nav}>
          <ul>
            <li className={styles.selected}>
              <a href="./">
                <span>Mes formations</span>
              </a>
            </li>
            <li>
              <a href="./">
                <span>Mes formations</span>
              </a>
            </li>
          </ul>
          <button className={styles.plus}>
            <Image src="/plus.svg" height="28px" width="28px" />
          </button>
        </section>
      </div>
      {children}
    </>
  );
}
