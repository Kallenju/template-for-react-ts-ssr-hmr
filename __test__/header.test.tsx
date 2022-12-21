/*
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../src/shared/Header';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should increment counter', async () => {
    render(<Header />);

    const button = screen.getByRole('button', { name: /clicked/i });
    expect(button).toHaveTextContent('Clicked 0 times');

    await userEvent.click(button);
    expect(button).toHaveTextContent('Clicked 1 times');
  });
});
