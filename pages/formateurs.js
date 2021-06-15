import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { connect } from "react-redux";

import styles from "../styles/Formateur.module.css";
import InformationCard from "../components/informationCard";
import WithPrivateRoute from "../components/privatRoute";
import {
  getFormateur,
  addFormateur,
  deleteFormateur,
} from "../actions/formateurs";

function Formateurs(props) {
  const [formateurs, setFormateurs] = useState([]);

  const [formateur, setFormateur] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    props.getFormateur().then((data) => {
      setFormateurs(data);
    });
  }, [formateurs]);

  const deleteFormateur = (id) => {
    props.deleteFormateur(id);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <input
            value={formateur.name}
            placeholder="Ajouter un formateur"
            onChange={(e) =>
              setFormateur({ ...formateur, name: e.target.value })
            }
          />
          <button
            onClick={() => {
              props.addFormateur(formateur);
              setFormateur({
                name: "",
                avatar: "",
              });
            }}
          >
            <Image src="/check.svg" width="20px" height="20px" />
          </button>
        </div>
        {formateurs &&
          formateurs.map((formateur, index) => {
            return (
              <InformationCard
                key={index}
                item={formateur}
                deleteFormateur={deleteFormateur}
              />
            );
          })}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formateurs: state.formateurs,
});

const mapDispatchToProps = {
  getFormateur,
  addFormateur,
  deleteFormateur,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formateurs);
