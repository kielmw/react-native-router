import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetails from './job-details/[id]'; // Adjust this path as necessary
import Popularjobs from '../components/home/popular/Popularjobs';
import AudioPages from '../components/home/audio/AudioPages';
import Welcome from '../components/home/welcome/Welcome.jsx';
import LoginPage from './LoginPage.js';
import Home from '../app/index'; // Import the Home component

const Stack = createStackNavigator();

const Navigator = () => {
  const [username, setUsername] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={username ? "Home" : "LoginPage"}>
        {username == null ? (
          <Stack.Screen name="LoginPage">
            {(props) => <LoginPage {...props} setUsername={setUsername} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Home">
            {(props) => <Home {...props} username={username} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Popularjobs">
          {(props) => <Popularjobs {...props} username={username} />}
        </Stack.Screen>
        <Stack.Screen name="JobDetails" component={JobDetails} />
        <Stack.Screen name="AudioPages" component={AudioPages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
