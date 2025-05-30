import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SecondScreen from '../SecondScreen';

describe('SecondScreen', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<SecondScreen />);

    expect(screen.getByText('This is the second screen (empty).')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});
