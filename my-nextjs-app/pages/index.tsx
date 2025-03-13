import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<any>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      setErrorMessage('');
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();

      // Fetch the top five repositories using the user's repos_url
      const reposResponse = await fetch(`${data.repos_url}?per_page=5&sort=updated`);
      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        data.topRepos = repos;
      } else {
        console.error('Error fetching repositories');
      }
      
      setProfile(data);
      console.log('GitHub profile:', data);
    } catch (error: any) {
      setProfile(null);
      setErrorMessage("Profile not Found");
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
          style={{ marginRight: '25px' }}
        />
        <button onClick={handleSearch} className={styles.button}>Search</button>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {profile && (
      <div className={styles.profile}>
        <img src={profile.avatar_url} alt="Avatar" className={styles.avatar} />
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
        <p>Repositories: {profile.public_repos}</p>
        <p>Followers: {profile.followers}</p>
        {profile.topRepos && profile.topRepos.length > 0 && (
        <div>
          <h3>Top Repositories</h3>
          <ul>
          {profile.topRepos.map((repo: any) => (
            <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            </li>
          ))}
          </ul>
        </div>
        )}
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
        </a>
      </div>
      )}
    </div>
  );
};

export default Home;