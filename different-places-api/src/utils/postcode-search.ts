import { AUSPOST_POSTCODE_SEARCH_URL } from '../constants/urls';
import logger from 'loglevel';

const auspostApiAuthKey = process.env.AUSPOST_API_AUTH_KEY;

interface Locality {
  category: string;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  postcode: number;
  state: string;
}

interface Localities {
  locality: Array<Locality> | Locality;
}

interface PostcodeSearchResponse {
  localities: Localities | string;
}

export function transformPostcodeSearchData(
  postcode: string,
  data: PostcodeSearchResponse,
) {
  const { localities } = data;

  if (!localities || typeof localities === 'string') {
    return null;
  }

  const { locality } = localities;

  const locations = Array.isArray(locality) ? locality : [locality];

  return {
    postcode,
    locations: locations?.map(({ location, latitude, longitude }) => ({
      name: location,
      latitude,
      longitude,
    })),
  };
}

export async function searchPostcode(postcode: string) {
  const response = await fetch(
    `${AUSPOST_POSTCODE_SEARCH_URL}q=${postcode}&state=VIC`,
    {
      headers: {
        ...(auspostApiAuthKey && {
          'auth-key': process.env.AUSPOST_API_AUTH_KEY,
        }),
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    logger.error({
      message: 'Error retrieving localities from postcode search API',
      data: {
        status: response.status,
        url: response.url,
        error: data.error,
      },
    });

    return { status: 'rejected' };
  }

  const place = transformPostcodeSearchData(postcode, data);

  return { status: 'resolved', place };
}
