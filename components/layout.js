import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import Messages from "./messages";
import styles from "../styles/Layout.module.css";
import { useDispatch } from "react-redux";
import { logout, getProfile } from "../actions/auth";

export default function Layout({ children }) {
  const [selected, setSelected] = useState("formations");
  const [dropDown, setDropDown] = useState(false);
  const [center, setCenter] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile()).then((data) => setCenter(data));
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
                {center && <p className={styles.userName}>{center.name}</p>}
              </div>

              <div className={styles.rightSection}>
                <a
                  className={styles.profile}
                  onClick={() => setDropDown(!dropDown)}
                >
                  {center && (
                    <>
                      <p className={styles.user}>{center.name}</p>
                      <img
                        src={`http://localhost:3080/upload/${center.avatar}.png`}
                        width="40"
                        height="40"
                      />
                    </>
                  )}
                </a>
                {dropDown && (
                  <div className={styles.dropDown}>
                    <ul>
                      <li
                        onClick={() => {
                          setDropDown(false);
                          Router.push("/profile");
                          setSelected("");
                        }}
                      >
                        Profil
                      </li>
                      <li
                        onClick={() => {
                          localStorage.removeItem("userToken");
                          setSelected("");
                          setDropDown(false);
                          Router.push("/login");
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
