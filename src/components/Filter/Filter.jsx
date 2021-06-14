import React from "react";
import styles from "./Filter.module.scss";

const Filter = (props) => {
  const { changeMedium } = props;


  // assign variable on click

  // run function to 

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.titleBox}>
          <p className={styles.title}>MEDIUM</p>
        </div>
        <div
          className={styles.filters}
          onClick={(e) => {
            const menuItems = document.querySelectorAll("p");
            menuItems.forEach((p) => {
              p.style.color = "black";
            });

            e.target.style.color = "#f03635";
            changeMedium(e.target);
          }}
        >
          <p>Silk</p>
          <p>Marble</p>
          <p>Bronze</p>
          <p>Clay</p>
          <p>Gold</p>
          <p>Metal</p>
          <p>Paper</p>
          <p>Stone</p>
          <p>Silver</p>
          <p>Copper</p>
          <p>Ivory</p>
          <p>Wood</p>
          <p>Glass</p>
        </div>
      </div>
    </>
  );
};

export default Filter;
