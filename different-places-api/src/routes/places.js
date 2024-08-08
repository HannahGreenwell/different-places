import express from 'express';
import * as PostcodeSearch from '../services/postcode-search';

const router = express.Router();

router.get('/places/:postcode', getPlace);

// TODO
// tests
// validate postcode

async function getPlace(req, res) {
  const { postcode } = req.params;

  const { success, place } = await PostcodeSearch.search(postcode);

  if (!success) {
    return res.status(502).json({ message: 'Unable to fetch place data' });
  }

  if (!place) {
    return res.status(404).send({ error: 'Invalid postcode' });
  }

  res.send({ place });
}

export { router };
