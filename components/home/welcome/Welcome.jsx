import { useState } from 'react'
import { View, Text , TextInput , TouchableOpacity , Image , FlatList} from 'react-native'
import { useRouter } from 'expo-router'
import { icons , SIZES} from '../../../constants';
import styles from './welcome.style' 

const jobTypes = [ "Kelas", "Evaluasi", "Spelling" ]

const Welcome = () => {
  const router= useRouter();
  const [activeJobType , setActiveJobType ] = useState ('Kelas')
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Kiel</Text>
        <Text style={styles.welcomeMessage}>Welcome to Learning App</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput}
            value=''
            onChange={() => {}}
            placeholder='Liat apa hayo ?'
          />

        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
          <Image source={icons.search}
          resizeMode='contain'
          style= {styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item})=> (
            <TouchableOpacity style = {styles.tab(activeJobType,item)}
              onPress={() => {
                setActiveJobType(item);
                router.push (`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small}}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome