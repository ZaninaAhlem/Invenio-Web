import { useState } from "react";
import Image from "next/image";
import Router from "next/image";
import { connect } from "react-redux";

import styles from "../styles/Card.module.css";
import { deleteFormation } from "../actions/Formations";

function Card(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.card}>
      {props.post.image && (
        <Image src={props.post.image} height="280" width="375" />
      )}

      <div className={styles.vector} onClick={() => setIsVisible(!isVisible)}>
        <Image src="/vector.svg" height="58px" width="140px" />
        <button
          className={styles.settingsIcon}
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <Image src="/settings.svg" height="16" width="16" />
        </button>
        {isVisible && (
          <div className={styles.settings}>
            <button onClick={() => Router.push("/form")}>
              <Image src="/edit-2.svg" width="15px" height="15px" />
              <p>Modifier</p>
            </button>
            <button onClick={() => props.deleteFormation(props.post._id)}>
              <Image src="/trash-2.svg" width="15px" height="15px" />
              <p>Supprimer</p>
            </button>
          </div>
        )}
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>{props.post.title}</h1>
        <p className={styles.description}>{props.post.description}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formations: state.formation,
});

const mapDispatchToProps = {
  deleteFormation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
