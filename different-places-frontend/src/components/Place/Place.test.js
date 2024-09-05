import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Place from './Place';

global.fetch = jest.fn();

test('renders Where to next? button', () => {
  render(<Place />);

  expect(
    screen.getByRole('button', { name: 'Where to next?' }),
  ).toBeInTheDocument();
});

test('renders place when user clicks Where to next? button', async () => {
  fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
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
      }),
  });

  render(<Place />);

  await userEvent.click(screen.getByRole('button', { name: 'Where to next?' }));

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(screen.getByText(3068)).toBeInTheDocument();
  expect(screen.getByText('CLIFTON HILL')).toBeInTheDocument();
  expect(screen.getByText('FITZROY NORTH')).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Where to next?' }),
  ).not.toBeInTheDocument();
});

test('renders error message if place request fails', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 502,
    json: () => Promise.resolve({ error: 'Unable to retrieve place data' }),
  });

  render(<Place />);

  await userEvent.click(screen.getByRole('button', { name: 'Where to next?' }));

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(screen.getByText(/Error: /)).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Where to next?' }),
  ).not.toBeInTheDocument();
});
