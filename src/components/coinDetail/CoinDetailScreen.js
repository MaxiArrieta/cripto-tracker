import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert
} from 'react-native'
import Colors from '../../res/colors'
import { Get } from '../../libs/http'
import CoinMarketItem from './CoinMarketItem'
import { Storage } from '../../libs/storage'

const CoinDetailScreen = ({ navigation, route }) => {
  const { coin } = route.params
  const [market, setMarket] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    navigation.setOptions({ title: coin.symbol })
    getMarket(coin.id)
    getFavorites()
  })

  const getSymbolIcon = (nameid) => {
    if (nameid) {
      const url = `https://c1.coinlore.com/img/25x25/${nameid}.png`
      return url
    }
  }

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volimen 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      }
    ]
    return sections
  }

  const getMarket = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const markets = await Get(url)
    setMarket(markets)
  }

  const toogleFavorites = () => {
    if (isFavorite) {
      removeFavorite()
    } else {
      addFavorite()
    }
  }

  const addFavorite = async () => {
    const coins = JSON.stringify(coin)
    const key = `favorite-${coin.id}`

    const stored = await Storage.store(key, coins)

    if (stored) {
      setIsFavorite(true)
    }
  }

  const removeFavorite = async () => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {
        text: 'cancel',
        onPress: () => { },
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`
          await Storage.remove(key)
          setIsFavorite(false)
        },
        style: 'destructive'
      }
    ])
  }

  const getFavorites = async () => {
    try {
      const key = `favorite-${coin.id}`
      const fav = await Storage.get(key)
      if (fav !== null) setIsFavorite(true)
    } catch (error) {
      console.log('get favorites error', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImage}
            source={{ uri: getSymbolIcon(coin.nameid) }}
          />
          <Text style={styles.title}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={() => toogleFavorites()}
          style={[
            styles.btnFavorite,
            isFavorite
              ? styles.btnFavoriteRemove
              : styles.btnFavoritesAdd
          ]}
        >
          <Text style={styles.btnFavoriteText}>
            {
              isFavorite
                ? 'Remove Favorite'
                : 'Add Favorite'
            }
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal
        data={market}
        renderItem={({ item }) => <CoinMarketItem item={item} />}
      />
    </View>
  )
}

export default CoinDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  row: {
    flexDirection: 'row'
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconImage: {
    height: 25,
    width: 25
  },
  title: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8
  },
  section: {
    maxHeight: 220
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: Colors.white,
    fontSize: 14
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16
  },
  marketTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoritesAdd: {
    backgroundColor: Colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine
  },
  btnFavoriteText: {
    color: Colors.white
  }
})
