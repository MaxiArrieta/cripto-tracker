import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import FavoritesEmptyState from './FavoritesEmptyState'
import CoinsItem from '../coins/CoinsItem'
import Colors from '../../res/colors'
import { Storage } from '../../libs/storage'

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState(null)

  useEffect(() => {
    getFavorites()
    navigation.addListener('focus', getFavorites)
  }, [navigation])

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.getAllKeys()
      const keys = allKeys.filter((key) => key.includes('favorite-'))

      const favs = await Storage.multiGet(keys)
      const favorits = favs.map((fav) => JSON.parse(fav[1]))
      console.log(favorits)
      setFavorites(favorits)
    } catch (error) {
      console.log('get favorite error', error)
    }
  }

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', { coin })
  }

  return (
    <View style={styles.container}>
      {
        favorites?.length === 0
          ? <FavoritesEmptyState />
          : null
      }
      {
        favorites?.length > 0
          ? <FlatList
              data={favorites}
              renderItem={({ item }) => (
                <CoinsItem item={item} onPress={() => handlePress(item)} />
              )}
            />
          : null
      }
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1
  }
})
