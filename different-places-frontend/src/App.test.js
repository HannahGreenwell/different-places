import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

global.fetch = jest.fn();

test('renders Different Places heading', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Different Places', level: 1 }),
  ).toBeInTheDocument();
});
