import React from 'react';
import { API_BASE_URL } from '../../constants/urls';
import postcodes from '../../data/postcodes.json';
import './Place.css';

const getRandomPostcode = () => {
  const { list } = postcodes;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

function Place() {
  const [place, setPlace] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleClick = async () => {
    const postcode = getRandomPostcode();

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}api/places/${postcode}`);
      const data = await response.json();
      if (response.ok) {
        setPlace(data.place);
      } else {
        setError(data.error);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <>
        <pre>
          <span className="Place-error">Error: {error?.message || error}</span>
        </pre>
      </>
    );
  }

  if (!place) {
    return (
      <button
        className="Place-button"
        disabled={isLoading}
        onClick={handleClick}
      >
        Where to next?
      </button>
    );
  }

  return (
    <>
      <p className="Place-info">{place.postcode}</p>
      {place.locations.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </>
  );
}

export default Place;
