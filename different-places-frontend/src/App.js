import React from "react";
import postcodes from "./data/postcodes.json";
import "./App.css";

const getPostcode = () => {
  const { list } = postcodes;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

function App() {
  const [postcode, setPostcode] = React.useState(null);

  return (
    <div className="App">
      <header>
        <h1 className="App-header" onClick={() => setPostcode(null)}>
          Different
          <br />
          Places
        </h1>
      </header>

      {postcode ? (
        <p className="App-postcode">{postcode}</p>
      ) : (
        <button
          className="App-button"
          onClick={() => setPostcode(getPostcode())}
        >
          Where to next?
        </button>
      )}
    </div>
  );
}

export default App;
