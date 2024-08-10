export const MOCK_SINGLE_LOCALITY_MATCHED_DATA = {
  localities: {
    locality: {
      category: 'Delivery Area',
      id: 5511,
      latitude: -37.80293059,
      location: 'ABBOTSFORD',
      longitude: 144.9974869,
      postcode: 3067,
      state: 'VIC',
    },
  },
};

export const MOCK_MULTIPLE_LOCALITIES_MATCHED_DATA = {
  localities: {
    locality: [
      {
        category: 'Delivery Area',
        id: 5512,
        latitude: -37.79021717,
        location: 'CLIFTON HILL',
        longitude: 144.9976586,
        postcode: 3068,
        state: 'VIC',
      },
      {
        category: 'Delivery Area',
        id: 5513,
        latitude: -37.78389665,
        location: 'FITZROY NORTH',
        longitude: 144.9842953,
        postcode: 3068,
        state: 'VIC',
      },
    ],
  },
};

export const MOCK_NO_LOCALITIES_MATCHED_DATA = { localities: '' };

export const getPostcodeSearchOkResponse = () => ({
  ok: true,
  status: 200,
  json: () => Promise.resolve(MOCK_MULTIPLE_LOCALITIES_MATCHED_DATA),
});

export const getPostcodeSearchUnmatchedResponse = () => ({
  ok: true,
  status: 200,
  json: () => Promise.resolve(MOCK_NO_LOCALITIES_MATCHED_DATA),
});

export const getPostcodeSearchBadResponse = () => ({
  ok: false,
  status: 403,
  json: () =>
    Promise.resolve({
      error: {
        errorMessage: 'Sorry, you are not authorised to use this service.',
      },
    }),
});
