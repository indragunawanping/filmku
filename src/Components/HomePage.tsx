import React from 'react';
import styles from './HomePage.module.css';
import SearchBarContainer from "../Containers/SearchBarContainer";

const HomePage = () => {
  return (
    <div className={styles.HomePageContentContainer}>
      <SearchBarContainer/>
    </div>
  )
};

export default HomePage;
