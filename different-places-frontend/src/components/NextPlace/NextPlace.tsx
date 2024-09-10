import React from 'react';
import postcodes from '../../data/postcodes.json';
import './NextPlace.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface Place {
  postcode: string;
  locations: Array<Location>;
}

const getRandomPostcode = () => {
  const { list } = postcodes;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

function NextPlace() {
  const [place, setPlace] = React.useState<Place>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <>
        <pre>
          <span className="NextPlace-error">Error: {error}</span>
        </pre>
      </>
    );
  }

  if (!place) {
    return (
      <button
        className="NextPlace-button"
        disabled={isLoading}
        onClick={handleClick}
      >
        Where to next?
      </button>
    );
  }

  return (
    <>
      <p className="NextPlace-info">{place.postcode}</p>
      {place.locations.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </>
  );
}

export default NextPlace;
