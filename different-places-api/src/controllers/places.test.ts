import request from 'supertest';
import logger from 'loglevel';
import app from '../app';
import {
  getPostcodeSearchBadResponse,
  getPostcodeSearchOkResponse,
  getPostcodeSearchUnmatchedResponse,
} from '../test/utils/postcode-search';

logger.error = jest.fn();

global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('GET /places/:id', () => {
  test('returns 200 and the place requested', async () => {
    (fetch as jest.Mock).mockResolvedValue(getPostcodeSearchOkResponse());

    const response = await request(app).get('/api/places/3068');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      place: {
        postcode: '3068',
        locations: [
          {
            name: 'CLIFTON HILL',
            latitude: -37.79021717,
            longitude: 144.9976586,
          },
          {
            name: 'FITZROY NORTH',
            latitude: -37.78389665,
            longitude: 144.9842953,
          },
        ],
      },
    });
  });

  test('returns 404 when no places are found', async () => {
    (fetch as jest.Mock).mockResolvedValue(
      getPostcodeSearchUnmatchedResponse(),
    );

    const response = await request(app).get('/api/places/1111');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'No places found matching postcode: 1111',
    });
  });

  test('returns 502 when postcode search response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue(getPostcodeSearchBadResponse());

    const response = await request(app).get('/api/places/3068');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(502);
    expect(response.body).toEqual({ error: 'Unable to retrieve place data' });
  });

  test('returns 500 when postcode search fails', async () => {
    (fetch as jest.Mock).mockRejectedValue('Postcode search API is down');

    const response = await request(app).get('/api/places/3068');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
  });
});
