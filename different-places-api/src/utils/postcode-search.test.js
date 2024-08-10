import logger from 'loglevel';
import { searchPostcode, transformPostcodeSearchData } from './postcode-search';
import {
  getPostcodeSearchOkResponse,
  getPostcodeSearchBadResponse,
  getPostcodeSearchUnmatchedResponse,
  MOCK_SINGLE_LOCALITY_MATCHED_DATA,
  MOCK_MULTIPLE_LOCALITIES_MATCHED_DATA,
  MOCK_NO_LOCALITIES_MATCHED_DATA,
} from '../test/utils/postcode-search';

describe('searchPostcode', () => {
  logger.error = jest.fn();

  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns a place and resolved status when postcode search is successful', async () => {
    fetch.mockResolvedValue(getPostcodeSearchOkResponse());

    const { place, status } = await searchPostcode('3068');

    expect(place).toEqual({
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
    });
    expect(status).toBe('resolved');
  });

  test('returns a null place and resolved status when postcode search is unmatched', async () => {
    fetch.mockResolvedValue(getPostcodeSearchUnmatchedResponse());

    const { place, status } = await searchPostcode('1111');

    expect(status).toBe('resolved');
    expect(place).toBeNull();
  });

  test('returns rejected status when postcode search is not successful', async () => {
    fetch.mockResolvedValue(getPostcodeSearchBadResponse());

    const { place, status } = await searchPostcode('3068');

    expect(status).toBe('rejected');
    expect(place).toBeUndefined();
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});

describe('transformPostcodeSearchData', () => {
  test('returns a transformed place when postcode matches a single locality', () => {
    const place = transformPostcodeSearchData(
      '3067',
      MOCK_SINGLE_LOCALITY_MATCHED_DATA,
    );

    expect(place).toEqual({
      postcode: '3067',
      locations: [
        {
          name: 'ABBOTSFORD',
          latitude: -37.80293059,
          longitude: 144.9974869,
        },
      ],
    });
  });

  test('returns a transformed place when postcode matches multiple localities', () => {
    const place = transformPostcodeSearchData(
      '3068',
      MOCK_MULTIPLE_LOCALITIES_MATCHED_DATA,
    );

    expect(place).toEqual({
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
    });
  });

  test('returns null when postcode is unmatched', () => {
    const place = transformPostcodeSearchData(
      '1111',
      MOCK_NO_LOCALITIES_MATCHED_DATA,
    );

    expect(place).toBeNull();
  });
});
