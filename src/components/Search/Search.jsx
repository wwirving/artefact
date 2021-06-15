import React from "react";
import styles from "./Search.module.scss";

const Search = (props) => {
  const { updateSearchText, reset } = props;

  return (
    <>
      <div className={styles.searchBox}>
        {/* <div className={styles.instructions}>
          <p> 2. Search for keyword</p>
        </div> */}
        <input
          type="text"
          placeholder="ENTER KEYWORD"
          onInput={(e) => updateSearchText(e.target.value)}
        ></input>
        {/* <div className={styles.instructions}>
          <p> 3. Run Search </p>
        </div> */}
        <div className={styles.searchButton}>
          <p onClick={(e) => reset(e)}>SEARCH</p>
        </div>
      </div>
    </>
  );
};

export default Search;
