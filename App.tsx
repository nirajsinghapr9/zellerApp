import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import awsconfig from './aws-exports';
import HomeScreen from './src/screens/HomeScreen';
import SecondScreen from './src/screens/SecondScreen';
import {RootStackParamList} from './src/types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const client = new ApolloClient({
  link: createHttpLink({
    uri: awsconfig.aws_appsync_graphqlEndpoint,
    headers: {
      'x-api-key': awsconfig.aws_appsync_apiKey,
    },
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Users'}}
          />
          <Stack.Screen
            name="Second"
            component={SecondScreen}
            options={{title: 'Second Screen'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
