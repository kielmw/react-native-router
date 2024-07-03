import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

const Popularjobs = ({ username }) => {
  const navigation = useNavigation(); // Initialize navigation hook
  const { data, isLoading, error, refetch } = useFetch(`api/proses/nim/${username}`);
  const [selectedJob, setSelectedJob] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleCardPress = (item) => {
    navigation.navigate('JobDetails', { idKelas: item.idKelas }); // Navigate to 'JobDetails' screen
    setSelectedJob(item.idKelas);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refetch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kelas</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={() => handleCardPress(item)}
              />
            )}
            keyExtractor={(item) => item.idKelas.toString()} // Ensure keyExtractor is a string
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
