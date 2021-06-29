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
  const [selectedDemand, setSelectedDemand] = useState();

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
    <>
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
              <span className={styles.badge}>{inscDemands.length}</span>
            )}
          </div>
          <div>
            {!expended && <span>{subscribers.length} inscrits</span>}
            <button className={styles.expand}>
              <img src="./chevron-down.svg" />
            </button>
          </div>
        </div>
        {expended && (
          <div className={styles.hidenInfo}>
            <h3>Les demandes d'inscription:</h3>
            {inscDemands.length > 0 &&
              inscDemands.map((inscDemand, index) => {
                return (
                  <section key={index} className={styles.demandCard}>
                    <div>
                      <img
                        src={`http://localhost:3080/upload/${inscDemand.avatar}.png`}
                        height="30"
                        width="30"
                      />
                      <h5>{inscDemand.name}</h5>
                    </div>
                    <div>
                      <button
                        className={styles.actionBtn}
                        onClick={(e) => {
                          setShowResponses(inscDemand.name);
                          setSelectedDemand(inscDemand);
                        }}
                      >
                        <img src="/eye.svg" width="20px" height="20px" />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={(e) =>
                          clickHandler(e, {
                            id: inscDemand._id,
                            accepted: true,
                          })
                        }
                      >
                        <img src="/check.svg" width="20px" height="20px" />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={(e) =>
                          clickHandler(e, {
                            id: inscDemand._id,
                            accepted: false,
                          })
                        }
                      >
                        <img src="/x.svg" width="20px" height="20px" />
                      </button>
                    </div>
                  </section>
                );
              })}
            <hr className={styles.separator} />
            <h3>Les inscrits:</h3>
            {subscribers.map((subscriber, index) => {
              return (
                <div key={index} className={styles.subscriber}>
                  <img
                    src={`http://localhost:3080/upload/${subscriber.avatar}.png`}
                    height="30"
                    width="30"
                  />
                  <h5>{subscriber.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedDemand && (
        <div className={styles.modal}>
          <div className={styles.overlay}></div>
          <div className={styles.mainContainer}>
            <button
              className={styles.close}
              onClick={() => setSelectedDemand(null)}
            >
              <img src="/close.svg" height="20" width="20" />
            </button>
            <section className={styles.form}>
              <img
                src={`http://localhost:3080/upload/${selectedDemand.avatar}.png`}
                height="40"
                width="40"
              />
              <h5 className={styles.name}>{selectedDemand.name}</h5>
            </section>
            <div className={styles.row}>
              <div className={styles.subRow}>
                {formLabels.map((label, index) => {
                  return (
                    <span key={index} className={styles.label}>
                      {label}
                    </span>
                  );
                })}
              </div>
              <div className={styles.subRow}>
                {selectedDemand.response.map((res, index) => {
                  return (
                    <span key={index} className={styles.answer}>
                      {res}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getInscDemands,
  getInscriptionForm,
  responseInscDemands,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersCard);
