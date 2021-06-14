import styles from "./App.module.scss";
import Title from "./components/Title";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Card from "./components/Card";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";

function App() {
  const API_URL =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=";

  const [lastSearchTerm, setLastSearchTerm] = useState("");

  const [medium, setMedium] = useState("");

  const [objectArr, setObjectArr] = useState([]);

  const zeroIndex = 1;

  const [index, setIndex] = useState(zeroIndex);

  const getObjects = (searchTerm) => {
    const string = `${API_URL}${searchTerm}&medium=${medium}`;
    setLastSearchTerm(searchTerm);
    return fetch(`${string}`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse.objectIDs !== null) {
          increaseIndex();
          return jsonResponse.objectIDs;
        } else {
          return [];
        }
      });
  };

  const increaseIndex = () => {
    if (index <= objectArr.length) {
      setIndex(index + 1);
    }
  };

  const decreaseIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const pulse = async (e) => {
    await updateObjects(lastSearchTerm);
    setIndex(index - index);
  };

  const updateObjects = async (searchTerm) => {
    const apiObjects = await getObjects(searchTerm);
    setObjectArr(apiObjects);
  };

  const updateMedium = async (searchTerm) => {
    setMedium(searchTerm.innerText);
  };

  useEffect(async ()=>{
   pulse();
  },[medium]);



  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        <div className={styles.inputBlock}>
          <Title />
          <Filter changeMedium={updateMedium} />
          <Search
            updateSearchText={updateObjects}
            medium={medium}
            reset={pulse}
          />
        </div>
        <div className={styles.outputBlock}>
          <Card objects={objectArr} index={index} />
          <Nav next={increaseIndex} prev={decreaseIndex} />
        </div>
      </div>
    </div>
  );
}

export default App;
