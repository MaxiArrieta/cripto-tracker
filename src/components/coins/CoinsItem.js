import React from 'react'
import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native'
import Colors from '../../res/colors'

const CoinsItem = ({ item, onPress }) => {
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png')
    } else {
      return require('../../assets/arrow_down.png')
    }
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price_usd}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.pocentText}>{item.percent_change_1h}</Text>
        <Image
          style={styles.imageIcon}
          source={getImgArrow()}
        />
      </View>
    </Pressable>
  )
}

export default CoinsItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderColor: Colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 16 : 0,
    marginLeft: Platform.OS === 'ios' ? 0 : 16
  },
  row: {
    flexDirection: 'row'
  },
  symbolText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },
  name: {
    color: Colors.white,
    fontSize: 16,
    marginRight: 16
  },
  priceText: {
    color: Colors.white,
    fontSize: 14
  },
  pocentText: {
    color: Colors.white,
    fontSize: 12,
    marginRight: 8
  },
  imageIcon: {
    width: 22,
    height: 22
  }
})
