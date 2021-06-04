import { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";

import styles from "../styles/Formateur.module.css";
import InformationCard from "../components/informationCard";
import { getFormations, getInscrits } from "../actions/Formations";

function Inscrits(props) {
  const { posts } = props.formations;

  const [inscrits, setInscrits] = useState([
    {
      name: "Lakrech Lamia",
      avatar: "/profileImage.png",
    },
  ]);

  useEffect(() => {
    if (process.browser) {
      let id = localStorage.getItem("userId");
      props.getFormations(id);
    }
  }, []);

  const getInscrits = (formation) => {
    props.getInscrits(formation._id).then((data) => console.log(data));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts &&
          posts.map((formation, index) => {
            getInscrits(formation);
          })}
        {/* {inscrits.map((inscrit, index) => {
          return <InformationCard key={index} item={inscrit} />;
        })} */}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formations: state.formation,
  inscrits: state.inscrits,
});

const mapDispatchToProps = {
  getFormations,
  getInscrits,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inscrits);
