import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetails from './job-details/[id]';
import Popularjobs from '../components/home/popular/Popularjobs';
import AudioPages from '../components/home/audio/AudioPages';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Popularjobs" component={Popularjobs} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="AudioPages" component={AudioPages} />
    </Stack.Navigator>
  );
};

export default Navigator;