import React from "react";
import styles from "./Card.module.scss";
import { useState, useEffect } from "react";

const Card = (props) => {
  const { sculpture } = props;

  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");

  const [medium, setMedium] = useState("");

  const [showInfo, setShowInfo] = useState(false);

  const flipCard = showInfo ? styles.description : styles.opaque;

  useEffect(() => {
    
    const updateImage = (currentSculpture) => {
      if (Object.keys(sculpture).length > 1) {
        if (sculpture.primaryImage.length > 1) {
          setImage(sculpture.primaryImage);
        } else {
          setImage(sculpture.additionalImages[0]);
        }
      } else return "";
    };

      updateImage(sculpture);
      setTitle(sculpture.title);
      setMedium(sculpture.medium);
      setDate(sculpture.objectDate);
    
  }, [sculpture]);

  return (
    <>
      <div className={styles.imgBox} onClick={() => setShowInfo(!showInfo)}>
        <div className={flipCard}>
          <p>TITLE -{title}</p>
          <p>MEDIUM - {medium}</p>
          <p>DATE - {date}</p>
        </div>
        <img src={image} alt="" onerror="this.style.display='none'" />
      </div>
    </>
  );
};

export default Card;
