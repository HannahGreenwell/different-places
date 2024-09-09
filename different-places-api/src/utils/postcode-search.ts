import logger from 'loglevel';
import { AUSPOST_POSTCODE_SEARCH_URL } from '../constants/urls';
import { PostcodeSearchResponse, Place, Status } from '../types';

const auspostApiAuthKey = process.env.AUSPOST_API_AUTH_KEY;

export function transformPostcodeSearchData(
  postcode: string,
  data: PostcodeSearchResponse,
): Place | undefined {
  const { localities } = data;

  if (!localities || typeof localities === 'string') {
    return;
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

export async function searchPostcode(postcode: string): Promise<{
  status: Status;
  place?: Place;
}> {
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

    return { status: Status.Rejected };
  }

  const place = transformPostcodeSearchData(postcode, data);

  return { status: Status.Resolved, place };
}
