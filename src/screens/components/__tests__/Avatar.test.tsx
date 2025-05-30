import React from 'react';
import {render} from '@testing-library/react-native';
import Avatar from '../Avatar';

describe('Avatar Component', () => {
  test('renders avatar with initial from name', () => {
    const {getByText} = render(<Avatar name="John" />);
    expect(getByText('J')).toBeTruthy();
  });

  test('renders "?" when name is missing', () => {
    const {getByText} = render(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });
});
