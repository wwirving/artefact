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

  const [searchTerm, setSearchTerm] = useState("");

  const [medium, setMedium] = useState("");

  const [objectArr, setObjectArr] = useState([]);

  const [index, setIndex] = useState(0);

  const [sculpture, setSculpture] = useState({});

  const getObjects = () => {
    const string = `${API_URL}${searchTerm}&medium=${medium}`;
    return fetch(`${string}`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse.objectIDs !== null) {
          setObjectArr(jsonResponse.objectIDs);
        } else {
          setObjectArr([]);
        }
      });
  };

  const getSculpture = () => {
    const API_URL =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const string = `${API_URL}${objectArr[index]}`;
    return fetch(`${string}`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse !== null) {
          setSculpture(jsonResponse);
        } else {
          return [];
        }
      });
  };

  const increaseIndex = () => {
    if (index < objectArr.length - 1) {
      setIndex(index + 1);
      console.log(index);
      console.log(objectArr[index]);
    } else if (index == objectArr.length - 1){
      zeroIndex();
    }
  };

  const zeroIndex = () => {
    if (index > 1){
      setIndex(1);
    } else if (index <= 1){
      setIndex(2);
    }
    
  }

  const decreaseIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const updateSearchTerm = (searchField) => {
    console.log(searchField.target.value);
    setSearchTerm(searchField.target.value);
  };

  const updateMedium = (searchTerm) => {
    setMedium(searchTerm.innerText);
  };

  const triggerSearch = () => {
    console.log(medium);
    console.log(searchTerm);
    console.log(index);
    getObjects().then(() => {
      zeroIndex();
      console.log(objectArr.length);
    })
  }

  useEffect(() => {
    if (objectArr.length > 1){
      getSculpture();
    } else {
      return null;
    }
  },[index])



  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        <div className={styles.inputBlock}>
          <Title />
          <Filter changeMedium={updateMedium} />
          <Search
            updateSearchText={updateSearchTerm}
            medium={medium}
            click={triggerSearch}
          />
        </div>
        <div className={styles.outputBlock}>
          <Card sculpture={sculpture}/>
          <Nav next={increaseIndex} prev={decreaseIndex} />
        </div>
      </div>
    </div>
  );
}

export default App;
