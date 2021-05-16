import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import { useState } from "react";

export default function Home() {
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
  ]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Invenio</title>
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className={styles.main}>
        {posts.map(function (post, index) {
          return <Card post={post} key={index} />;
        })}
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
