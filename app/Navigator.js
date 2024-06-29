import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetails from './job-details/[id]'; // Double-check this import path
import Popularjobs from '../components/home/popular/Popularjobs';
import AudioPages from '../components/home/audio/AudioPages';
import Welcome from '../components/home/welcome/Welcome.jsx';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator > {/* Set initialRouteName to your default screen */}
      <Stack.Screen name="Popularjobs" component={Popularjobs} />
      <Stack.Screen name="JobDetails" component={JobDetails} /> {/* Make sure dynamic routes work correctly */}
      <Stack.Screen name="AudioPages" component={AudioPages} />
    </Stack.Navigator>
  );
};

export default Navigator;
