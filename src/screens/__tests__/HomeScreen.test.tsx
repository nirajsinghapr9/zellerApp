import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock React Navigation's useNavigation
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

const mockRoute = {
  key: 'HomeScreen',
  name: 'Home',
  params: undefined,
};

const mockUseQuery = jest.fn();
jest.mock('@apollo/client', () => {
  return {
    gql: (strings: TemplateStringsArray) => strings[0],
    useQuery: (query: any, options: any) => mockUseQuery(query, options),
  };
});

// Dummy data for test
const mockData = {
  listZellerCustomers: {
    items: [
      {id: '1', name: 'Alice', role: 'ADMIN'},
      {id: '2', name: 'Bob', role: 'MANAGER'},
    ],
  },
};

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('shows loading indicator while loading', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
      refetch: jest.fn(),
    });

    const {toJSON} = render(
      <HomeScreen
        navigation={{navigate: jest.fn()} as any}
        route={mockRoute as any}
      />,
    );
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('shows error message if error occurs', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error('Failed to fetch'),
      refetch: jest.fn(),
    });

    const {getByText} = render(
      <HomeScreen
        navigation={{navigate: jest.fn()} as any}
        route={mockRoute as any}
      />,
    );
    expect(getByText('Error loading users.')).toBeTruthy();
  });

  it('renders list of users', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    const {toJSON} = render(
      <HomeScreen
        navigation={{navigate: jest.fn()} as any}
        route={mockRoute as any}
      />,
    );

    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
    expect(screen.getAllByText(/Admin|Manager/i).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('changes selected role when clicking radio buttons', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    const {getByTestId, toJSON} = render(
      <HomeScreen
        navigation={{navigate: jest.fn()} as any}
        route={mockRoute as any}
      />,
    );
    expect(screen.getByTestId('radio-Admin')).toBeDefined();
    expect(screen.getByTestId('radio-Manager')).toBeDefined();

    const managerRadio = getByTestId('radio-Manager');

    fireEvent.press(managerRadio);
    expect(toJSON()).toMatchSnapshot();
  });
});
