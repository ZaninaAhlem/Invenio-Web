import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import Messages from "./messages";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const [selected, setSelected] = useState("formations");
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const url = window.location.href;
      const currentPage = url.split("/").pop();
      if (url === "http://localhost:3000/") {
        setSelected("formations");
      } else {
        setSelected(currentPage);
      }
    }
  }, []);
  return (
    <>
      {selected !== "login" ? (
        <div>
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
                  onClick={() => setDropDown(!dropDown)}
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
                {dropDown && (
                  <div className={styles.dropDown}>
                    <ul>
                      <li
                        onClick={() => {
                          Router.push("/profile");
                          setSelected("");
                        }}
                      >
                        Profil
                      </li>
                      <li
                        onClick={() => {
                          Router.push("/profile");
                          setSelected("");
                        }}
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
                )}
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
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
