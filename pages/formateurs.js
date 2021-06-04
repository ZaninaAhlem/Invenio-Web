import { useState } from "react";
import Head from "next/head";
import { connect } from "react-redux";

import styles from "../styles/Formateur.module.css";
import FormateurCard from "../components/informationCard";

function Formateurs(props) {
  const [formateurs, setFormateurs] = useState([
    {
      name: "Lakrech Lamia",
      avatar: "/profileImage.png",
    },
  ]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {formateurs.map((formateur, index) => {
          return <FormateurCard key={index} item={formateur} />;
        })}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formateurs: state.formateurs,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Formateurs);
