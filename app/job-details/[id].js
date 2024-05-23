import React from 'react'
import { View, Text , SafeAreaView, ScrollView , ActivityIndicator, RefreshControl} from 'react-native'
import { Stack , useRouter ,useSearchParams} from 'expo-router'
import { useCallback, useState } from 'react'
import { Company , JobAbout , JobFooter , JobTabs , ScreenHeaderBtn, Specifics} from '../../components'
import { COLORS, SIZES , icons} from '../../constants';
import useFetch from '../../hook/useFetch'

const JobDetails= () => {
    const params = useSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch ('job-details' , {idKelas: params.id})
   
    return (
        <SafeAreaView style ={{ flex: 1,backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen>
                options = {{
                    headerStyle: { backgroundColor: COLORS.lightWhite}, 
                    headerShadowVisible: false,
                    headerBackVisible:false,
                    headerLeft: () => {
                                
                    }
                }

                }
            </Stack.Screen>
        </SafeAreaView>
        // <Text>
        //     Ini Detail Kelas
        // </Text>
    )
}

export default JobDetails