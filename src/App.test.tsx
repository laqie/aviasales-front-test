import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders filters title', () => {
  const { getByText } = render(<App />);
  const filtersTitle = getByText(/количество пересадок/i);
  expect(filtersTitle).toBeInTheDocument();
});
