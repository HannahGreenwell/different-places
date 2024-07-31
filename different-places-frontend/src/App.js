import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
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

      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "500px", height: "500px" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
}

export default App;
