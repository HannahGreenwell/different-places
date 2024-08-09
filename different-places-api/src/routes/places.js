import express from 'express';
import { getPlace } from './../controllers/places';

const router = express.Router();

router.get('/places/:postcode', getPlace);

export { router };
