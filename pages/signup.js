import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import styles from "../styles/Form.module.css";
import { signup } from "../actions/auth";
import { connect } from "react-redux";

function Signup(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: null,
  });

  const onclick = (e) => {
    e.preventDefault();
    props.signup(form).then(() => {
      Router.push(`/`);
    });
  };

  const onChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <>
      <Head>
        <title>Invenio | signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formContainer}>
        <label>nom</label>
        <input
          name="name"
          type="text"
          required
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <label>email</label>
        <input
          name="email"
          type="text"
          required
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <label>password</label>
        <input
          name="password"
          type="password"
          required
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <label>phone number</label>
        <input
          name="phoneNumber"
          required
          onChange={(e) =>
            onChange(e.target.name, parseInt(e.target.value, 10))
          }
        />
        <button onClick={onclick}>Sign Up</button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  center: state.authReducer.center,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
