import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setProfile(data);
      console.log('GitHub profile:', data);
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GitHub Profile Search</h1>
      <p className={styles.description}>
      Search for a GitHub user profile by entering their username in the search box below.
      </p>
      <div className={styles.search}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>Search</button>
      </div>
      {profile && (
      <div className={styles.profile}>
        <img src={profile.avatar_url} alt="Avatar" className={styles.avatar} />
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
        <p>Repositories: {profile.public_repos}</p>
        <p>Followers: {profile.followers}</p>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
        </a>
      </div>
      )}
    </div>
  );
};

export default Home;