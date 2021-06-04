import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";
import Messages from "./messages";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const [selected, setSelected] = useState("formations");
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
            <a
              className={styles.profile}
              onClick={() => {
                Router.push("/profile");
                setSelected("");
              }}
            >
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
            <li
              onClick={() => {
                setSelected("formations");
                Router.push("/");
              }}
              className={selected === "formations" ? styles.selected : null}
            >
              <a>
                <span>Mes formations</span>
              </a>
            </li>
            <li
              onClick={() => {
                setSelected("formateurs");
                Router.push("/formateurs");
              }}
              className={selected === "formateurs" ? styles.selected : null}
            >
              <a>
                <span>Mes formateurs</span>
              </a>
            </li>
            <li
              onClick={() => {
                setSelected("inscrits");
                Router.push("/inscrits");
              }}
              className={selected === "inscrits" ? styles.selected : null}
            >
              <a>
                <span>Mes inscrits</span>
              </a>
            </li>
          </ul>
          <button
            className={styles.plus}
            onClick={() => {
              Router.push("/form");
              setSelected("");
            }}
          >
            <Image src="/plus.svg" height="28px" width="28px" />
          </button>
        </section>
      </div>
      {children}
      <Messages />
    </>
  );
}
