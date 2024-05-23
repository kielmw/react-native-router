// Navigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetails from './job-details/[id]';
import Popularjobs from '../components/home/popular/Popularjobs';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Popularjobs" component={Popularjobs} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
    </Stack.Navigator>
  );
};

export default Navigator;
