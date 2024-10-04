import App from './App';
import { render, screen } from '@testing-library/react';

describe('App component test', () => {
  it('should render the App', () => {
    render(<App />);
    screen.debug();
  });
});
