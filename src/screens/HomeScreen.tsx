import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {LIST_ZELLER_CUSTOMERS} from '../graphql/queries';
import {
  ZellerCustomer,
  ListZellerCustomersData,
  ListZellerCustomersVars,
} from '../types/graphqlTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RadioButton} from 'react-native-paper';
import Avatar from './components/Avatar';
import {capitalizeFirstChar} from '../util/util';

type RootStackParamList = {
  Home: undefined;
  Second: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const USER_TYPES = ['Admin', 'Manager'];

export default function HomeScreen({navigation}: Props) {
  const [selectedRole, setSelectedRole] = useState<string>('Admin');

  const {data, loading, error, refetch} = useQuery<
    ListZellerCustomersData,
    ListZellerCustomersVars
  >(LIST_ZELLER_CUSTOMERS, {
    variables: selectedRole
      ? {filter: {role: {eq: selectedRole.toUpperCase()}}}
      : {},
  });

  function renderItem({item}: {item: ZellerCustomer}) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Second')}>
        <Avatar name={item.name} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>
            {capitalizeFirstChar(item?.role || '')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.headerTitle}>User Types</Text>
        {USER_TYPES.map(role => (
          <TouchableOpacity
            key={role}
            style={[
              styles.radioButtonContainer,
              selectedRole === role && styles.radioButtonSelected,
            ]}
            onPress={() => setSelectedRole(role)}
            testID={`radio-${role}`}
            activeOpacity={0.7}>
            <RadioButton
              value={role}
              status={selectedRole === role ? 'checked' : 'unchecked'}
              onPress={() => setSelectedRole(role)}
            />
            <Text style={styles.name}>{role}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          testID="loading-indicator"
        />
      )}
      {error && <Text style={styles.error}>Error loading users.</Text>}

      <FlatList
        onRefresh={refetch}
        refreshing={loading}
        data={data?.listZellerCustomers.items ?? []}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        testID="user-list"
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  filterContainer: {
    marginBottom: 16,
  },

  item: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
  },
  name: {fontSize: 16, color: 'black'},
  role: {fontSize: 12, color: '#999'},
  error: {color: 'red', marginVertical: 12},
  listContainer: {paddingBottom: 80},
  navButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  radioButtonContainer: {flexDirection: 'row', alignItems: 'center'},
  radioButtonSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 20,
  },
  itemTextContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
});
