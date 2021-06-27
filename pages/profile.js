import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Image from "next/image";
import { connect } from "react-redux";

import WithPrivateRoute from "../components/privatRoute";
import styles from "../styles/Profile.module.css";
import {
  getProfile,
  updateProfile,
  logout,
  deleteAccount,
  uploadAvatar,
} from "../actions/auth";

function Profile(props) {
  const [tab, setTab] = useState("profile");
  const [center, setCenter] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: null,
    pays: "",
    adresse: "",
    avatar: "",
  });

  useEffect(() => {
    props.getProfile().then((data) => {
      data &&
        setCenter({
          name: data.name || "",
          email: data.email || "",
          password: data.password || "",
          phoneNumber: data.phoneNumber || "",
          pays: data.pays || "",
          adresse: data.adresse || "",
          avatar: data.avatar || "",
          bio: data.bio || "",
          specialities: data.specialities || "",
          type: data.type || "",
          founded: data.founded || "",
        });
    });
  }, []);

  const onChange = (field, value) => {
    setCenter({ ...center, [field]: value });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio | {center.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.leftSide}>
          <div>{center.image && <Image />}</div>
          <h2>{center.name}</h2>
          <button
            className={tab === "profile" && styles.selected}
            onClick={() => setTab("profile")}
          >
            <Image src="/user.svg" width="20px" height="20px" />
            <span>Editer Profil</span>
          </button>
          <button
            className={tab === "settings" && styles.selected}
            onClick={() => setTab("settings")}
          >
            <Image src="/settings.svg" width="20px" height="20px" />
            <span>Paramètres</span>
          </button>
          <hr className={styles.separator} />
          <button
            onClick={() => {
              props.logout().then(() => Router.push("/login"));
            }}
          >
            <Image src="/power.svg" width="20px" height="20px" />
            <span>Logout</span>
          </button>
          <button
            onClick={() => {
              props.deleteAccount().then(() => Router.push("/login"));
            }}
          >
            <Image src="/trash.svg" width="20px" height="20px" />
            <span>Supprimer Profil</span>
          </button>
        </section>
        <section className={styles.formContainer}>
          <form className={styles.form}>
            {tab === "profile" && (
              <>
                <h3>Informations personnelles</h3>
                <br />
                <label>Bio</label>
                <textarea
                  name="bio"
                  type="text"
                  required
                  value={center.bio}
                  placeholder="Bio"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>Spécialitées</label>
                <input
                  name="specialities"
                  type="text"
                  required
                  value={center.specialities}
                  placeholder="Spécialitées"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>Type</label>
                <input
                  name="type"
                  type="text"
                  required
                  value={center.type}
                  placeholder="Type"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>Fondée</label>
                <input
                  name="founded"
                  type="text"
                  required
                  value={center.founded}
                  placeholder="Fondée"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>Adresse</label>
                <input
                  name="adresse"
                  type="text"
                  required
                  value={center.adresse}
                  placeholder="Adresse"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
              </>
            )}

            {tab === "settings" && (
              <>
                <h3>Sécurité</h3>
                <br />
                <label>nom</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={center.name}
                  placeholder="Name"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>email</label>
                <input
                  name="email"
                  type="text"
                  required
                  value={center.email}
                  placeholder="Email"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  value={center.password}
                  required
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <label>phone number</label>
                <input
                  name="phoneNumber"
                  value={center.phoneNumber}
                  required
                  onChange={(e) =>
                    onChange(e.target.name, parseInt(e.target.value, 10))
                  }
                />
              </>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                props.updateProfile(center);
              }}
            >
              Editer
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  center: state.authReducer.center,
});

const mapDispatchToProps = {
  getProfile,
  updateProfile,
  deleteAccount,
  logout,
  uploadAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
