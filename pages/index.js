import { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";

import styles from "../styles/Home.module.css";
import Card from "../components/card";
import { getFormations } from "../actions/Formations";
import WithPrivateRoute from "../components/privatRoute";

function Home(props) {
  // const { posts } = props.formations;
  const [posts, setPosts] = useState([]);

  //local variables
  let fillers = [];

  //states
  const [elements, setElement] = useState(0);

  useEffect(() => {
    const elements = Math.floor(
      (document.getElementById("cards__container")?.getBoundingClientRect()
        ?.width || 0) / 375
    );
    setElement(elements);
    if (process.browser) {
      let id = localStorage.getItem("userId");
      props.getFormations(id).then((data) => setPosts(data));
    }
  }, [posts]);

  const fill = () => {
    for (let i = 0; i <= elements; i++) {
      fillers.push(<i key={i} />);
    }
  };

  fill();

  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id="cards__container" className={styles.cards__container}>
          {!!posts && posts.length > 0 ? (
            posts.map(function (post, index) {
              return <Card post={post} key={index} />;
            })
          ) : (
            <div className={styles.emptyCard}>
              <p style={{ fontSize: 36 }}>Titre de la formation</p>
              <p style={{ fontSize: 20 }}>Description de la formation</p>
            </div>
          )}
          {fillers.map((filler) => {
            return filler;
          })}
        </div>
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  formations: state.formation,
});

const mapDispatchToProps = {
  getFormations,
};

export default WithPrivateRoute(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
