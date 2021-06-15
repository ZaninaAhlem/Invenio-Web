import Image from "next/image";
import { connect } from "react-redux";

import styles from "../styles/Formateur.module.css";
import { deleteFormateur } from "../actions/formateurs";

function InformationCard(props) {
  return (
    <div className={styles.card}>
      <div>
        {!props.item.avatar ? (
          <div className={styles.noAvatar}>
            <span>{props.item.name[0]}</span>
          </div>
        ) : (
          <div className={styles.avatar}>
            <Image src={props.item.avatar} width="50px" height="50px" />
          </div>
        )}
        <h5>{props.item.name}</h5>
      </div>
      <button
        onClick={() => {
          props.deleteFormateur(props.item._id);
        }}
      >
        <Image src="/trash.svg" width="20px" height="20px" />
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formateurs: state.formateurs,
});

const mapDispatchToProps = {
  deleteFormateur,
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationCard);
