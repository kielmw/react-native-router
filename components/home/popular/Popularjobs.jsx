import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('api/proses/nim/123456789');
  const [selectedJob, setSelectedJob] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.idKelas}`);
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
            keyExtractor={(item) => item.idKelas}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]} // Customize refresh indicator color
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
