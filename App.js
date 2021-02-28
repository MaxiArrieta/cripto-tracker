import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CoinsStack from './src/components/coins/CoinsStack'
import FavoritesStack from './src/components/favorites/FavoritesStack'
import Colors from './src/res/colors'

const Tabs = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name='Coins'
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                source={require('./src/assets/bank.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            )
          }}
        />
        <Tabs.Screen
          name='Favorites'
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                source={require('./src/assets/star.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default App
