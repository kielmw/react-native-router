import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hook/useFetch';
import { useRoute } from '@react-navigation/native'; // Import useRoute from react-navigation

const JobDetails = () => {
    // const route = useRoute();
    // const { idKelas } = route.params; // Extract idKelas from route params
    // const router = useRouter();

    // const { data, isLoading, error, refetch } = useFetch(`api/proses/${idKelas}`);

    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        //     <Stack.Screen>
        //         {/* options={{
        //             headerStyle: { backgroundColor: COLORS.lightWhite },
        //             headerShadowVisible: false,
        //             headerBackVisible: false,
        //             headerLeft: () => { }
        //         }} */}
        //     </Stack.Screen>
        //     {isLoading ? (
        //         <ActivityIndicator size="large" color={COLORS.primary} />
        //     ) : error ? (
        //         <Text>Error: {error.message}</Text>
        //     ) : (
        //         <ScrollView>
        //             <View>
                        <Text>
                            Ini Detail Kelas
                        </Text>
        //                 {/* Render other components using data */}
        //             </View>
        //         </ScrollView>
        //     )}
        // </SafeAreaView>
    );
}

export default JobDetails;
