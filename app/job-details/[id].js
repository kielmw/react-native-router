import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS } from '../../constants';
import useFetch from '../../hook/useFetch';
import { useRoute } from '@react-navigation/native';

const JobDetails = () => {
    const route = useRoute();
    const { id } = route.params; // Get id from route params

    const { data, isLoading, error, refetch } = useFetch(`api/proses/${id}`);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => {}
                }}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : (
                <ScrollView>
                    <View>
                        <Text>Ini Detail Kelas</Text>
                        {/* Display the namaKelas */}
                        {data && data.namaKelas && (
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                {data.namaKelas}
                            </Text>
                        )}
                        {/* Render other components using data */}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default JobDetails;
