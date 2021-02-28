import React, { useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { Get/*, Post */ } from '../../libs/http'
import CoinsItem from './CoinsItem'
import Colors from '../../res/colors'
import CoinsSerch from './CoinsSerch'

const CoinsScreen = ({ navigation }) => {
  const [coins, setCoins] = useState(null)
  const [allCoins, setAllCoins] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCoins()
  }, [])

  const getCoins = async () => {
    const coin = await Get('https://api.coinlore.net/api/tickers/')
    setLoading(false)
    setCoins(coin.data)
    setAllCoins(coin.data)
  }

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', { coin })
  }

  const handleSearch = (query) => {
    const coinsFilter = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
    })
    setCoins(coinsFilter)
  }

  return (
    <View style={styles.container}>
      <CoinsSerch onChange={handleSearch} />
      {
        loading
          ? <ActivityIndicator
              style={styles.loader}
              color={Colors.white}
              size='large'
            />
          : null
      }
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <CoinsItem
            item={item}
            onPress={() => handlePress(item)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  loader: {
    marginTop: 60
  }
})

export default CoinsScreen
