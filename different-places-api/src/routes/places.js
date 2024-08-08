import express from 'express';
import { AUSPOST_POSTCODE_SEARCH_URL } from '../constants/urls';

const router = express.Router();

router.get('/places/:postcode', getPlace);

// TODO
// error handling
// tests

// logger
// validate postcode
// no localities returned

async function getPlace(req, res) {
  const { postcode } = req.params;

  try {
    const headers = { 'auth-key': process.env.AUSPOST_API_AUTH_KEY };

    const response = await fetch(
      `${AUSPOST_POSTCODE_SEARCH_URL}q=${postcode}&state=VIC`,
      { headers },
    );

    const data = await response.json();

    const { localities } = data;

    if (!localities) {
      return res.status(404).send({ error: 'Invalid postcode' });
    }

    const { locality } = localities;

    const locations = locality.length ? locality : [locality];

    const place = {
      postcode,
      locations: locations?.map(({ location, latitude, longitude }) => ({
        name: location,
        latitude,
        longitude,
      })),
    };

    res.send({ place });
  } catch (error) {
    console.log('error', error);
    res.status(500);
  }
}

export { router };
