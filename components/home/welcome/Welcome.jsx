import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // Ensure this import is correct
import styles from './welcome.style';

// const jobTypes = ["Spelling"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Kelas');
  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Welcome to Learning App</Text>
      </View>
      <View style={styles.tabsContainer}>
        {/* <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   style={styles.tab(activeJobType, item)}
            //   onPress={() => {
            //     setActiveJobType(item);
            //     if (item === "Spelling") {
            //       router.push('/audio/AudioPages'); // Use absolute path
            //     } else {
            //       router.push(`/search/${item}`);
            //     }
            //   }}
            // >
            //   <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            // </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: 20 }} // Adjust as per your styling needs
          horizontal
        /> */}
      </View>
    </View>
  );
};

export default Welcome;
