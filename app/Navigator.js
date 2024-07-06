import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this import is correct
import JobDetails from './job-details/[id]'; // Adjust this path as necessary
import Popularjobs from '../components/home/popular/Popularjobs';
import AudioPages from '../components/home/audio/AudioPages';
import Welcome from '../components/home/welcome/Welcome.jsx';
import LoginPage from './LoginPage.js';
import Home from '../app/index'; // Import the Home component

const Stack = createStackNavigator();

const Navigator = () => {
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to load username:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsername();
  }, []);

  const handleLogout = async () => {
    // Perform logout actions, such as resetting username state and removing from AsyncStorage
    setUsername(null);
    await AsyncStorage.removeItem('username');
  };

  if (isLoading) {
    return null; // Or some loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        {username == null ? (
          <Stack.Screen name="LoginPage">
            {(props) => <LoginPage {...props} setUsername={setUsername} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} username={username} handleLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Popularjobs" component={Popularjobs} />
            <Stack.Screen name="JobDetails" component={JobDetails} />
            <Stack.Screen name="AudioPages" component={AudioPages} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
