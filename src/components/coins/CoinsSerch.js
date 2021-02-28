import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Platform } from 'react-native'
import Colors from '../../res/colors'

const CoinsSerch = ({ onChange }) => {
  const [query, setQuery] = useState(null)

  const handleText = (query) => {
    setQuery(query)
    if (onChange) {
      onChange(query)
    }
  }
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios'
            ? styles.textInputIOS
            : styles.textInputAndoid
        ]}
        onChangeText={handleText}
        value={query}
        placeholder='Search coin'
        placeholderTextColor={Colors.white}
      />
    </View>
  )
}

export default CoinsSerch

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    color: Colors.white,
    backgroundColor: Colors.charade,
    paddingLeft: 16
  },
  textInputAndoid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }

})
