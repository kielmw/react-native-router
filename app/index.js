import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import { Welcome } from '../components';
import AudioPages from "../components/home/audio/AudioPages";
import Popularjobs from '../components/home/popular/Popularjobs';
import ScreenHeaderBtn from '../components/ScreenHeaderBtn';
import { icons, images } from '../constants';
import ErrorBoundary from '../ErrorBoundary';

const Home = ({ username, handleLogout }) => {
    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
                <Text style={{ marginRight: 10, color: COLORS.primary }} onPress={handleLogout}>Logout</Text>
            ),
            headerTitle: ""
        });
    }, [navigation, handleLogout]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome />
                    <Popularjobs username={username} />
                    <AudioPages />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
