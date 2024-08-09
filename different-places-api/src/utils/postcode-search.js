import { AUSPOST_POSTCODE_SEARCH_URL } from '../constants/urls';
import logger from 'loglevel';

function transformPostcodeSearchData(postcode, data) {
  const { localities } = data;

  if (!localities) {
    return null;
  }

  const { locality } = localities;

  const locations = locality.length ? locality : [locality];

  return {
    postcode,
    locations: locations?.map(({ location, latitude, longitude }) => ({
      name: location,
      latitude,
      longitude,
    })),
  };
}

export async function searchPostcode(postcode) {
  const response = await fetch(
    `${AUSPOST_POSTCODE_SEARCH_URL}q=${postcode}&state=VIC`,
    { headers: { 'auth-key': process.env.AUSPOST_API_AUTH_KEY } },
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
