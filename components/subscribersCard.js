import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Image from "next/image";

import {
  getInscDemands,
  getInscriptionForm,
  responseInscDemands,
} from "../actions/Formations";
import styles from "../styles/Inscrits.module.css";

function SubscribersCard(props) {
  const item = props.formation;
  const [expended, setExpended] = useState(false);
  const [showResponses, setShowResponses] = useState("");
  const [id, setId] = useState("");
  const [inscDemands, setInscDemands] = useState([]);
  const [formLabels, setFormLabels] = useState([]);
  const [subscribers, setSubscribers] = useState(item.subscribers);

  useEffect(() => {
    const getData = () => {
      props.getInscDemands(item.id).then((data) => {
        setInscDemands(data.responses);
        setId(data._id);
      });
      props.getInscriptionForm(item.id).then((data) => setFormLabels(data));
    };
    getData();
  }, []);

  const clickHandler = (e, data) => {
    e.preventDefault();
    props.responseInscDemands(id, data).then((data) => {
      setInscDemands(data.responses);
      setSubscribers(data.subscribers);
    });
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.shownInfo}
        onClick={() => {
          setExpended(!expended);
        }}
      >
        <div>
          <h3>{item.title}</h3>
          {inscDemands.length > 0 && !expended && (
            <span>{inscDemands.length}</span>
          )}
        </div>
        {!expended && <span>{subscribers.length} subscribers</span>}
      </div>
      {expended && (
        <div className={styles.hidenInfo}>
          <p>Les demandes d'inscription:</p>
          {inscDemands.length > 0 &&
            inscDemands.map((inscDemand, index) => {
              return (
                <section key={index} className={styles.demandCard}>
                  <div>
                    <img
                      src={`http://localhost:3080/upload/${inscDemand.avatar}.png`}
                      height="40"
                      width="40"
                    />
                    <h5>{inscDemand.name}</h5>
                    <button
                      onClick={(e) => {
                        setShowResponses(inscDemand.name);
                      }}
                    >
                      <img src="/eye.svg" width="20px" height="20px" />
                    </button>
                    {showResponses === inscDemand.name && (
                      <section className={styles.form}>
                        <button onClick={() => setShowResponses("#")}>
                          <img src="/x.svg" height="20" width="20" />
                        </button>
                        <div>
                          <img
                            src={`http://localhost:3080/upload/${inscDemand.avatar}.png`}
                            height="40"
                            width="40"
                          />
                          <h5 className={styles.name}>{inscDemand.name}</h5>
                        </div>
                        <section>
                          <div>
                            {formLabels.map((label, index) => {
                              return (
                                <span key={index} className={styles.label}>
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                          <div>
                            {inscDemand.response.map((res, index) => {
                              return (
                                <span key={index} className={styles.answer}>
                                  {res}
                                </span>
                              );
                            })}
                          </div>
                        </section>
                      </section>
                    )}
                  </div>
                  <div>
                    <button
                      className={styles.acceptBtn}
                      onClick={(e) =>
                        clickHandler(e, { id: inscDemand._id, accepted: true })
                      }
                    >
                      <img src="/check.svg" width="20px" height="20px" />
                    </button>
                    <button
                      className={styles.refuseBtn}
                      onClick={(e) =>
                        clickHandler(e, { id: inscDemand._id, accepted: false })
                      }
                    >
                      <img src="/x.svg" width="20px" height="20px" />
                    </button>
                  </div>
                </section>
              );
            })}
          <p>Les inscrits:</p>
          {subscribers.length > 0 ? (
            subscribers.map((subscriber, index) => {
              return (
                <div key={index} className={styles.subscriber}>
                  <img
                    src={`http://localhost:3080/upload/${subscriber.avatar}.png`}
                    height="40"
                    width="40"
                  />
                  <h5>{subscriber.name}</h5>
                </div>
              );
            })
          ) : (
            <>
              <h5>user 1</h5>
              <h5>user 2</h5>
              <h5>user 3</h5>
              <h5>user 4</h5>
              <h5>user 5</h5>
              <h5>user 6</h5>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getInscDemands,
  getInscriptionForm,
  responseInscDemands,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersCard);
