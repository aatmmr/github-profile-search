import React from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Next.js App!</h1>
      <p className={styles.description}>
        This is a simple website built with Next.js.
      </p>
    </div>
  );
};

export default Home;