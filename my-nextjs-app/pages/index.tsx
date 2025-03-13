import React from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GitHub Profile Search</h1>
      <p className={styles.description}>
        Search for a GitHub user profile by entering their username in the search box above.
      </p>
    </div>
  );
};

export default Home;