import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import { connect } from "react-redux";

import styles from "../styles/Login.module.css";
import { signIn, signUp } from "../actions/auth";

function Login(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [tab, setTab] = useState(1);

  const signIn = () => props.signIn(form);
  const signUp = () => props.signUp(signUpForm);

  const onclick = (e) => {
    e.preventDefault();
    if (tab === 1) {
      signIn().then((data) => {
        if (data.token) Router.push("/");
      });
    } else {
      signUp().then((data) => {
        console.log(data);
        if (data) Router.push("/");
      });
    }
  };

  const changeHandler = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const onChange = (field, value) => {
    setSignUpForm({ ...signUpForm, [field]: value });
  };

  return (
    <>
      <Head>
        <title>Invenio | login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h3 className={styles.quote}>
          Trouvez des formations dans le confort de votre maison.
        </h3>
        <img src="/login-bg.png" alt="" />
        <div className={styles.formContainer}>
          <div
            className={
              styles.tab + " " + (tab === 1 ? styles.left : styles.right)
            }
          >
            <label
              className={tab === 1 ? styles.selected : undefined}
              onClick={() => setTab(1)}
            >
              Sign In
            </label>
            <label
              className={tab === 2 ? styles.selected : undefined}
              onClick={() => setTab(2)}
            >
              Sign up
            </label>
          </div>
          {tab === 1 ? (
            <h2>
              Connectez vous! et accéder
              <br /> a votre espace.
            </h2>
          ) : (
            <h2>
              Créer votre compte
              <br /> dés maintenant!
            </h2>
          )}
          <div className={styles.form}>
            {tab === 1 ? (
              <form>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    changeHandler("email", e.target.value);
                  }}
                />
                <input
                  placeholder="Mot de passe"
                  type="password"
                  onChange={(e) => {
                    changeHandler("password", e.target.value);
                  }}
                />
                <button
                  className={styles.button}
                  onClick={onclick}
                  type="submit"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form>
                <input
                  placeholder="Nom du Centre"
                  type="text"
                  onChange={(e) => {
                    onChange("name", e.target.value);
                  }}
                />
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    onChange("email", e.target.value);
                  }}
                />
                <input
                  placeholder="Mot de passe"
                  type="password"
                  onChange={(e) => {
                    onChange("password", e.target.value);
                  }}
                />
                <button
                  className={styles.button}
                  onClick={onclick}
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  center: state.authReducer.center,
});

const mapDispatchToProps = {
  signIn,
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
