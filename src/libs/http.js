export const Get = async (url) => {
  try {
    const req = await window.fetch(url)
    const res = await req.json()
    return res
  } catch (error) {
    console.log('http get method error ', error)
    throw Error(error)
  }
}

export const Post = async (url, body) => {
  try {
    const req = await window.fetch(url, {
      method: 'POST',
      body
    })
    const res = req.json()

    return res
  } catch (error) {
    console.log('http post method error ', error)
    throw Error(error)
  }
}
