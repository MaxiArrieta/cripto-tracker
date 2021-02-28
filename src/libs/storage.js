import AsyncStorage from '@react-native-community/async-storage'

const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (error) {
    console.log('storage store error', error)
    return false
  }
}

const get = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {
    console.log('storage get error', error)
    throw Error(error)
  }
}

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    console.log('storage remove error', error)

    return false
  }
}

const multiGet = async (keys) => {
  try {
    return await AsyncStorage.multiGet(keys)
  } catch (error) {
    console.log('storage mutiget error', error)
    throw Error(error)
  }
}

const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (error) {
    console.log('storage allKeys error', error)
    throw Error(error)
  }
}

export const Storage = {
  store,
  get,
  remove,
  multiGet,
  getAllKeys

}
