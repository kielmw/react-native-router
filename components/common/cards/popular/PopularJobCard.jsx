import { View, Text , TouchableOpacity , Image} from 'react-native'

import styles from './popularjobcard.style'

const PopularJobCard = ({item, selectedJob , handleCardPress}) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob,item)}
      onPress={() => handleCardPress(item)}
    >
      <Text style={styles.companyName} numberOfLines={1}>
        {item.idKelas}
       </Text>
    </TouchableOpacity>
  )
}

export default PopularJobCard