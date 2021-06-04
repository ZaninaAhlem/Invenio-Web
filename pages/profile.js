import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { connect } from "react-redux";

import styles from "../styles/Form.module.css";
import {
  getProfile,
  updateProfile,
  logout,
  deleteAccount,
} from "../actions/auth";

function Profile(props) {
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
    props.getProfile().then((data) =>
      setCenter({
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        pays: data.pays,
        adresse: data.adresse,
        avatar: data.avatar,
      })
    );
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

      <main className={styles.formContainer}>
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
        <button
          onClick={() => {
            props.updateProfile(center);
          }}
        >
          Update
        </button>
        <button
          onClick={() => {
            props.logout().then(() => Router.push("/login"));
          }}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Logout
        </button>
        <button
          onClick={() => {
            props.deleteAccount().then(() => Router.push("/login"));
          }}
        >
          Delete
        </button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
