import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import { Welcome } from '../components';
import AudioPages from "../components/home/audio/AudioPages";
import Popularjobs from '../components/home/popular/Popularjobs';
import ScreenHeaderBtn from '../components/ScreenHeaderBtn';
import { icons } from '../constants';

const Home = ({ username }) => {
    const navigation = useNavigation();
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(!!username); // Check if username is initially present

    useEffect(() => {
        // Update loggedIn state when username prop changes
        setLoggedIn(!!username);
    }, [username]);

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

    const handleLogin = () => {
        // Perform login logic here, for simplicity just setting username
        // Replace with actual login functionality
        const storedUsername = inputUsername.trim(); // Example: Trim username input
        if (storedUsername) {
            setInputUsername(storedUsername);
            setLoggedIn(true); // Update loggedIn state
        }
    };

    const handleLogout = () => {
        // Perform logout actions, such as resetting username state
        setInputUsername('');
        setLoggedIn(false); // Update loggedIn state
    };

    if (!loggedIn) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                <TextInput
                    placeholder="Enter Username"
                    value={inputUsername}
                    onChangeText={setInputUsername}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingHorizontal: 10 }}
                />
                <TextInput
                    placeholder="Enter Password"
                    value={inputPassword}
                    onChangeText={setInputPassword}
                    secureTextEntry
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingHorizontal: 10 }}
                />
                <Button title="Login" onPress={handleLogin} />
            </SafeAreaView>
        );
    }

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
