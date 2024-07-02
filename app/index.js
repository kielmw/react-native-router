import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS , icons , images , SIZES} from '../constants';
import { Nearbyjobs , Popularjobs , ScreenHeaderBtn , Welcome} from '../components';
import AudioPages from "../components/home/audio/AudioPages";
import ErrorBoundary from '../ErrorBoundary';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Home = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulasi delay
                setIsLoading(false);
                await SplashScreen.hideAsync(); // Hide the splash screen once loading is complete
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return null; // Don't render anything while loading (splash screen is visible)
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                <Text style={{ color: 'red' }}>{error.message || 'An error occurred'}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome />
                    <Popularjobs />
                    <AudioPages />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default () => (
    <ErrorBoundary>
        <Home />
    </ErrorBoundary>
);
