import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import { connect } from "react-redux";

import styles from "../styles/Login.module.css";
import InputField from "../components/inputField";
import { signIn } from "../actions/auth";

function Login(props) {
  const [form, setForm] = useState({
    email: "adea@exp.com",
    password: "adea12345",
  });
  const signIn = () => props.signIn(form);

  const onclick = (e) => {
    e.preventDefault();
    signIn().then((data) => {
      if (data.token) Router.push("/");
    });
  };

  const changeHandler = (field, value) => {
    setForm({ ...form, [field]: value });
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
          <InputField
            placeholder="Email"
            onChange={(e) => {
              changeHandler("email", e.target.value);
            }}
          />
          <InputField
            placeholder="Mot de passe"
            onChange={(e) => {
              changeHandler("password", e.target.value);
            }}
          />
          <button className={styles.button} onClick={onclick}>
            Sign In
          </button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
