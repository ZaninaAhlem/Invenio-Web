import { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";

import styles from "../styles/Inscrits.module.css";
import SubscribersCard from "../components/subscribersCard";
import WithPrivateRoute from "../components/privatRoute";
import { getInscrits } from "../actions/Formations";

function Inscrits(props) {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    props.getInscrits().then((data) => setFormations(data));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {formations &&
          formations.map((formation, index) => {
            return <SubscribersCard key={index} formation={formation} />;
          })}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  inscrits: state.inscrits,
});

const mapDispatchToProps = {
  getInscrits,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inscrits);
