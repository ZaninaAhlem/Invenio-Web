import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "../components/card";

export default function Home() {
  //local variables
  let fillers = [];

  //states
  const [elements, setElement] = useState(0);
  const [posts, setPosts] = useState([
    {
      key: 1,
      title: "Devenez UX Designer",
      description: `Le parcours UX Design vous permettra d’acquérir des connaissances et
          des outils nécessaires pour comprendre les différents principes de la
          conception de l'expérience utilisateur, d'effectuer une bonne étude
          UX, d'utiliser les différents types de processus afin de
          conceptualiser un produit final dans une optique centrée utilisateur.`,
      image: "/cardImage.png",
    },
    {
      key: 1,
      title: "Devenez UX Designer",
      description: `Le parcours UX Design vous permettra d’acquérir des connaissances et
          des outils nécessaires pour comprendre les différents principes de la
          conception de l'expérience utilisateur, d'effectuer une bonne étude
          UX, d'utiliser les différents types de processus afin de
          conceptualiser un produit final dans une optique centrée utilisateur.`,
      image: "/cardImage.png",
    },
    {
      key: 1,
      title: "Devenez UX Designer",
      description: `Le parcours UX Design vous permettra d’acquérir des connaissances et
          des outils nécessaires pour comprendre les différents principes de la
          conception de l'expérience utilisateur, d'effectuer une bonne étude
          UX, d'utiliser les différents types de processus afin de
          conceptualiser un produit final dans une optique centrée utilisateur.`,
      image: "/cardImage.png",
    },
    {
      key: 1,
      title: "Devenez UX Designer",
      description: `Le parcours UX Design vous permettra d’acquérir des connaissances et
          des outils nécessaires pour comprendre les différents principes de la
          conception de l'expérience utilisateur, d'effectuer une bonne étude
          UX, d'utiliser les différents types de processus afin de
          conceptualiser un produit final dans une optique centrée utilisateur.`,
      image: "/cardImage.png",
    },
    {
      key: 1,
      title: "Devenez UX Designer",
      description: `Le parcours UX Design vous permettra d’acquérir des connaissances et
          des outils nécessaires pour comprendre les différents principes de la
          conception de l'expérience utilisateur, d'effectuer une bonne étude
          UX, d'utiliser les différents types de processus afin de
          conceptualiser un produit final dans une optique centrée utilisateur.`,
      image: "/cardImage.png",
    },
    {
      key: 1,
      title: "Devenez UX Designer",
      description: `Le parcours UX Design vous permettra d’acquérir des connaissances et
          des outils nécessaires pour comprendre les différents principes de la
          conception de l'expérience utilisateur, d'effectuer une bonne étude
          UX, d'utiliser les différents types de processus afin de
          conceptualiser un produit final dans une optique centrée utilisateur.`,
      image: "/cardImage.png",
    },
  ]);

  useEffect(() => {
    const elements = Math.floor(
      (document.getElementById("cards__container")?.getBoundingClientRect()
        ?.width || 0) / 375
    );
    setElement(elements);
  }, []);

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
          {posts.map(function (post, index) {
            return <Card post={post} key={index} />;
          })}
          {fillers.map((filler) => {
            return filler;
          })}
        </div>
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
