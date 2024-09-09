import { Request, Response } from 'express';
import { searchPostcode } from '../utils/postcode-search';
import { Place, Status } from '../types';

export async function getPlace(
  req: Request,
  res: Response,
): Promise<Response<Place>> {
  const { postcode } = req.params;

  const { place, status } = await searchPostcode(postcode);

  if (status === Status.Rejected) {
    return res.status(502).json({ error: 'Unable to retrieve place data' });
  }

  if (!place) {
    return res
      .status(404)
      .json({ error: `No places found matching postcode: ${postcode}` });
  }

  return res.send({ place });
}
