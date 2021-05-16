import Head from "next/head";
import styles from "../styles/Login.module.css";
import InputField from "../components/inputField";

export default function Login() {
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
          <InputField placeholder="Email" />
        </div>
      </div>
    </>
  );
}
