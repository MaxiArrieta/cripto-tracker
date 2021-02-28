import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../../res/colors'

const FavoritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
  )
}

export default FavoritesEmptyState

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
  }
})
