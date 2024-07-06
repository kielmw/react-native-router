import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './index';
import Popularjobs from '../components/home/popular/Popularjobs';
import JobDetails from './job-details/[id]'; // Adjust this path as necessary

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
    try {
      // Reset local state
      setUsername(null);

      // Remove username from AsyncStorage
      await AsyncStorage.removeItem('username');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (isLoading) {
    return null; // Or some loading indicator while checking username
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: true}}>
          {(props) => (
            username ? 
            <Home {...props} username={username} handleLogout={handleLogout} /> :
            <Home {...props} setUsername={setUsername} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Popularjobs" component={Popularjobs} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
