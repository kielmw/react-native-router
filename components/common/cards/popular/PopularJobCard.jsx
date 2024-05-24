import { View, Text, TouchableOpacity, Image } from 'react-native';
import favicon from '../../../../assets/favicon.png';
import { useNavigation } from '@react-navigation/native';

import styles from './popularjobcard.style';

const PopularJobCard = ({ item, selectedJob ,handleCardPress }) => {
  // const navigation = useNavigation();

  // const handleCardPress = () => {
  //   navigation.navigate('job-details', { idKelas: item.idKelas }); // Navigate to 'JobDetails' with idKelas parameter
  // };

  return (
    <TouchableOpacity style={styles.container(selectedJob, item)} onPress={handleCardPress}>
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image source={favicon} style={styles.logoImage} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.deskripsiKelas}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.namaKelas}
        </Text>
        <Text style={styles.location}>{item.namaGuru}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;