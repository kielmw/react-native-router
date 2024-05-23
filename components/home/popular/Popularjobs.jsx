import { useState } from 'react'
import { View, Text , TouchableOpacity , ActivityIndicator , FlatList} from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS , SIZES} from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { isLoading } from 'expo-font';
import useFetch from ' ../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  const {data ,isLoading , error} = useFetch
  ("api/proses/nim/101");

  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Kelas</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}> Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardscontainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>There is an error</Text>
        ) : (
          <FlatList
            data={[1,2,3,4]}
            renderItem={({item}) =>(
              <PopularJobCard
                item={item}
              />
            )}
            keyExtractor={item => item?.idKelas}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>

    </View>
  )
}

export default Popularjobs